import math

# import app.tool_paths.face_mill_math as fm_math
from fm_math_cl import FaceMillMath as fm_math


def first_line_feed(w_cut, d_cut, formatted_cut_to_line, ipm):
    if w_cut == 1 and d_cut == 1:
        return f"G01 {formatted_cut_to_line} F{ipm}"
    else:
        return f"G01 {formatted_cut_to_line}"


def face_top(
    tool_data, shape_data, feature_data, work_details, machine_definition, file_path
):
    confirmation = {"success": True}
    # UNPACK TOOL_DATA
    message = tool_data["message"]
    tool_number = tool_data["tool_number"]
    tool_diameter = float(tool_data["diameter"])
    depth_cut = float(tool_data["depthCuts"])
    nose_radius = float(tool_data["noseRadius"])
    step_over_percent = float(tool_data["stepOver"]) * 0.01
    retract_height = tool_data["retractHeight"]
    coolant_air = tool_data["coolantAir"]
    rpm = tool_data["rpm"]
    ipm = tool_data["ipm"]
    enter_exit = float(tool_data["enterExit"])
    stock_left_z = float(tool_data["stockLeftZ"])
    coolant_air = tool_data["coolantAir"]
    if coolant_air == "none":
        coolant_air = "9"
    else:
        coolant_air = machine_definition[coolant_air]

    # UNPACK FEATURE_DATA
    fm_path = feature_data["path"]
    stock = float(feature_data["stock"])
    z_face = float(feature_data["zFace"])
    r_plane = round(z_face + stock + 0.1, 3)

    # UNPACK WORK_DETAILS
    id = work_details["id"]
    offsets = work_details["offsets"]
    safe_height = float(work_details["safeHeight"])
    if retract_height == "true":
        retract_height = safe_height
    else:
        retract_height = r_plane

    # CALCULATE DEPTH CUTS
    roughing_stock = stock - stock_left_z
    number_of_depth_cuts = math.ceil(roughing_stock / depth_cut)
    calculated_depth_cuts = round(roughing_stock / number_of_depth_cuts, 5)
    z_cut_height = round(
        z_face + stock_left_z + ((number_of_depth_cuts - 1) * calculated_depth_cuts), 4
    )

    # create new instance of fm_math
    fm = fm_math(
        tool_diameter,
        nose_radius,
        step_over_percent,
        enter_exit,
        shape_data,
        fm_path,
    )

    x, y, cut_end = fm.get_formatted_axis_lines()
    number_of_steps = fm.get_number_of_steps()
    is_one_direction = fm.path_is_one_direction()
    # fm.f.write_instance_variables()

    if is_one_direction:
        with open(file_path, "a") as f:
            f.write(f"(id {id} {message})\n")
            f.write(f"T{tool_number} M06 ({tool_diameter} FaceMill)\n")
            f.write(f"G00 G90 {offsets} {x} {y} M03 S{rpm}\n")
            f.write(f"G43 Z{safe_height} M{coolant_air}\n")
            for d_cut, _ in enumerate(range(number_of_depth_cuts), 1):
                for w_cut, _ in enumerate(range(number_of_steps), 1):
                    x, y, cut_end = fm.get_formatted_axis_lines()

                    # opening sequence will position x, y axis
                    if w_cut != 1 or d_cut > 1:
                        f.write(f"{x} {y}\n")
                    # f.write(f"Z{r_plane}")
                    f.write(f"Z{z_cut_height}\n")

                    f.write(f"{first_line_feed(w_cut, d_cut, cut_end, ipm)}\n")
                    f.write(f"G00 Z{retract_height}\n")
                    if w_cut != number_of_steps:
                        fm.update_tool_position()
                fm.reset_step_over_position()
                z_cut_height = round(z_cut_height - calculated_depth_cuts, 4)

    else:
        with open(file_path, "a") as f:
            f.write(f"(id {id} {message})\n")
            f.write(f"T{tool_number} M06 ({tool_diameter} FaceMill)\n")
            f.write(f"G00 G90 {offsets} {x} {y} M03 S{rpm}\n")
            f.write(f"G43 Z{safe_height} M{coolant_air}\n")
            for d_cut, _ in enumerate(range(number_of_depth_cuts), 1):
                for w_cut, _ in enumerate(range(number_of_steps), 1):
                    x, y, cut_end = fm.get_formatted_axis_lines()

                    if w_cut != 1 or d_cut > 1:
                        f.write(f"G00 {x} {y}\n")
                    if w_cut == 1:
                        f.write(f"Z{z_cut_height}\n")

                    f.write(f"{first_line_feed(w_cut, d_cut, cut_end, ipm)}\n")
                    crosses_center = fm.does_cross_over_center()
                    if crosses_center:
                        x, y = fm.get_cross_over_center()
                        f.write(f"G00 {x} {y}\n")

                    fm.flip_cut_axis_location_current()
                    if w_cut != number_of_steps:
                        fm.update_tool_position()
                f.write(f"G00 Z{retract_height}\n")
                fm.reset_step_over_position()
                fm.reset_cut_axis_location()
                z_cut_height = round(z_cut_height - calculated_depth_cuts, 4)

    with open(file_path, "a") as f:
        f.write(f"G00 Z{safe_height} M09\n")
        f.write("G28 G91 Z0.\n")
        f.write("M01\n")
        f.write("\n")
    return confirmation


def face_top_finisher(
    tool_data, shape_data, feature_data, work_details, machine_definition, file_path
):
    confirmation = {"success": True}

    # UNPACK TOOL_DATA
    message = tool_data["message"]
    tool_number = tool_data["tool_number"]
    tool_diameter = float(tool_data["diameter"])
    step_over_percent = float(tool_data["stepOver"]) * 0.01
    retract_height = tool_data["retractHeight"]
    coolant_air = tool_data["coolantAir"]
    rpm = tool_data["rpm"]
    ipm = tool_data["ipm"]
    enter_exit = float(tool_data["enterExit"])
    coolant_air = tool_data["coolantAir"]
    nose_radius = 0
    if coolant_air == "none":
        coolant_air = "9"
    else:
        coolant_air = machine_definition[coolant_air]

    # UNPACK FEATURE_DATA
    fm_path = feature_data["path"]
    stock = float(feature_data["stock"])
    z_face = float(feature_data["zFace"])
    r_plane = round(z_face + stock + 0.1, 3)

    # UNPACK WORK_DETAILS
    id = work_details["id"]
    offsets = work_details["offsets"]
    safe_height = float(work_details["safeHeight"])
    if retract_height == "true":
        retract_height = safe_height
    else:
        retract_height = r_plane

    # create new instance of fm_math
    fm = fm_math(
        tool_diameter, nose_radius, step_over_percent, enter_exit, shape_data, fm_path
    )
    x, y, cut_end = fm.get_formatted_axis_lines()
    number_of_steps = fm.get_number_of_steps()
    is_one_direction = fm.path_is_one_direction()

    if is_one_direction:
        with open(file_path, "a") as f:
            f.write(f"(id {id} {message})\n")
            f.write(f"T{tool_number} M06 ({tool_diameter} FaceMill)\n")
            f.write(f"G00 G90 {offsets} {x} {y} M03 S{rpm}\n")
            f.write(f"G43 Z{safe_height} M{coolant_air}\n")

            for w_cut, _ in enumerate(range(number_of_steps), 1):
                x, y, cut_end = fm.get_formatted_axis_lines()

                if w_cut != 1:
                    f.write(f"{x} {y}\n")
                # f.write(f"Z{r_plane}\n")
                f.write(f"Z{z_face}\n")

                f.write(f"{first_line_feed(w_cut, 1, cut_end, ipm)}\n")
                f.write(f"G00 Z{retract_height}\n")

                if w_cut != number_of_steps:
                    fm.update_tool_position()

    else:
        with open(file_path, "a") as f:
            f.write(f"(id {id} {message})\n")
            f.write(f"T{tool_number} M06 ({tool_diameter} FaceMill)\n")
            f.write(f"G00 G90 {offsets} {x} {y} M03 S{rpm}\n")
            f.write(f"G43 Z{safe_height} M{coolant_air}\n")

            for w_cut, _ in enumerate(range(number_of_steps), 1):
                x, y, cut_end = fm.get_formatted_axis_lines()

                if w_cut != 1:
                    f.write(f"G00 {x} {y}\n")
                if w_cut == 1:
                    f.write(f"Z{z_face}\n")
                f.write(f"{first_line_feed(w_cut, 1, cut_end, ipm)}\n")

                crosses_center = fm.does_cross_over_center()
                if crosses_center:
                    x, y = fm.get_cross_over_center()
                    f.write(f"G00 {x} {y}\n")

                fm.flip_cut_axis_location_current()
                if w_cut != number_of_steps:
                    fm.update_tool_position()

            f.write(f"G00 Z{retract_height}\n")

    with open(file_path, "a") as f:
        f.write(f"G00 Z{safe_height} M09\n")
        f.write("G28 G91 Z0.\n")
        f.write("M01\n")
        f.write("\n")
    return confirmation


tool_data = {
    "message": "rougher in face-top unit",
    "tool_number": "2",
    "diameter": "2",
    "stockLeftZ": "0.005",
    "depthCuts": ".1",
    "noseRadius": "0",
    "rpm": "1000",
    "ipm": "22.0",
    "coolantAir": "coolant_on",
    "retractHeight": "true",
    "enterExit": ".1",
    "stepOver": "75",
}
finisher = {
    "coolantAir": "coolant_on",
    "diameter": "1",
    "enterExit": ".1",
    "ipm": "22.0",
    "message": "finisher in face-top unit",
    "retractHeight": "true",
    "rpm": "1000",
    "stepOver": "75",
    "tool_number": "2",
}
{"path": "Both Directions Y-axis", "stock": ".2", "zFace": "0"}
circ = {"shape": "circle", "radius": "3", "xCenter": "10", "yCenter": "10"}
rect = {"shape": "rectangle", "x1": "-3", "y1": "-3", "x3": "3", "y3": "3"}
feature_data = {"zFace": "0", "stock": ".2", "path": "Both Directions Y-axis"}
work_details = {
    "safeHeight": "6.0",
    "offsets": "G54",
    "operation": "face-top",
    "coordType": "shape",
    "operationGraphics": "milling",
    "id": 0,
}
machine_definition = {
    "id": 2,
    "machine_name": "MZ3",
    "machine_make": "Mazak",
    "machine_model": "510",
    "coolant_on": 8,
    "coolant_off": 11,
    "thru_coolant_on": 51,
    "thru_coolant_off": 9,
    "air_blast_on": 50,
    "air_blast_off": 9,
    "max_spindle_speed": 10000,
    "fourth_axis": "A",
    "units": "Standard",
    "x_travel": 31.3,
    "y_travel": 22.5,
    "z_travel": 16.88,
    "tooling_capacity": 30,
    "tool_height": 0,
    "tool_diameter": 0,
}
file_path = "test.txt"
face_top_finisher(
    finisher, rect, feature_data, work_details, machine_definition, file_path
)
