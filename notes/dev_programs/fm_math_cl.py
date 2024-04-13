import math


class FaceMillMath:
    pathList = [
        "One Direction X-axis 1",
        "One Direction X-axis 2",
        "One Direction Y-axis 1",
        "One Direction Y-axis 2",
        "Both Directions X-axis",
        "Both Directions Y-axis",
    ]

    def __init__(
        self,
        tool_diameter,
        nose_radius,
        step_over_percent,
        enter_exit_safe_distance,
        shape_data,
        fm_path,
    ):
        self.tool_diameter = tool_diameter
        self.nose_radius = nose_radius
        self.step_over_percent = step_over_percent
        self.enter_exit_safe_distance = enter_exit_safe_distance
        self.shape_data = shape_data
        self.fm_path = fm_path
        self.set_tool_path_directions(self.fm_path)
        self.calculate_step_over()
        self.cut_axis_location_current = self.cut_axis_location

    def calculate_step_over(self):
        self.tool_radius = self.tool_diameter / 2
        self.tool_step_over = round(
            (self.tool_radius - self.nose_radius) * self.step_over_percent * 2, 5
        )

        if self.shape_data["shape"] == "circle":
            self.set_circle_step_over_parameters()
        elif self.shape_data["shape"] == "rectangle":
            self.set_rectangle_step_over_parameters()

        self.number_of_steps = math.ceil(self.step_over_distance / self.tool_step_over)
        self.fm_total_step_over = round(self.number_of_steps * self.tool_step_over, 3)
        self.step_halves = (self.fm_total_step_over / 2) - (self.tool_step_over / 2)

        if self.shape_data["shape"] == "circle":
            self.set_circle_intercepts()
            self.set_circle_cutting_axis()
        elif self.shape_data["shape"] == "rectangle":
            self.set_rectangle_cutting_axis()

        self.current_step_over_position = self.step_axis_start

    def set_circle_step_over_parameters(self):
        self.shape_radius = float(self.shape_data["radius"])
        self.step_over_distance = self.shape_radius * 2
        if self.step_axis == "x":
            self.step_over_center = float(self.shape_data["xCenter"])
            self.cutting_center = float(self.shape_data["yCenter"])
        else:
            self.step_over_center = float(self.shape_data["yCenter"])
            self.cutting_center = float(self.shape_data["xCenter"])

    def set_circle_intercepts(self):
        self.c_squared = self.step_halves
        if self.step_axis_location == "positive":
            self.step_axis_start = self.step_halves + self.step_over_center
        else:
            self.step_axis_start = self.step_over_center - self.step_halves

        self.cut_intercept = math.sqrt(
            (self.shape_radius + self.tool_radius) ** 2 - self.c_squared**2
        )

    def set_circle_cutting_axis(self):
        if self.cut_axis_location == "positive":
            self.cut_axis_start = (
                self.cut_intercept + self.cutting_center + self.enter_exit_safe_distance
            )
            self.cut_axis_end = (
                self.cutting_center - self.cut_intercept - self.enter_exit_safe_distance
            )
        else:
            self.cut_axis_start = (
                self.cutting_center - self.cut_intercept - self.enter_exit_safe_distance
            )
            self.cut_axis_end = (
                self.cut_intercept + self.cutting_center + self.enter_exit_safe_distance
            )

    def set_rectangle_step_over_parameters(self):
        if self.step_axis == "x":
            self.step_over_distance = abs(
                float(self.shape_data["x1"]) - float(self.shape_data["x3"])
            )
            self.step_over_center = (
                float(self.shape_data["x1"]) + float(self.shape_data["x3"])
            ) / 2
        elif self.step_axis == "y":
            self.step_over_distance = abs(
                float(self.shape_data["y1"]) - float(self.shape_data["y3"])
            )
            self.step_over_center = (
                float(self.shape_data["y1"]) + float(self.shape_data["y3"])
            ) / 2

    def set_rectangle_cutting_axis(self):
        if self.step_axis_location == "positive":
            self.step_axis_start = self.step_halves + self.step_over_center
            self.step_axis_end = self.step_over_center - self.step_halves
        else:
            self.step_axis_start = self.step_over_center - self.step_halves
            self.step_axis_end = self.step_halves + self.step_over_center

        if self.cut_axis == "x":
            self.cut_distance = abs(
                float(self.shape_data["x1"]) - float(self.shape_data["x3"])
            )
            self.cutting_center = (
                float(self.shape_data["x1"]) + float(self.shape_data["x3"])
            ) / 2
        else:
            self.cut_distance = abs(
                float(self.shape_data["y1"]) - float(self.shape_data["y3"])
            )
            self.cutting_center = (
                float(self.shape_data["y1"]) + float(self.shape_data["y3"])
            ) / 2

        if self.cut_axis_location == "positive":
            self.cut_axis_start = (
                self.cutting_center
                + (self.cut_distance / 2)
                + self.enter_exit_safe_distance
                + self.tool_radius
            )
            self.cut_axis_end = (
                self.cutting_center
                - (self.cut_distance / 2)
                - self.enter_exit_safe_distance
                - self.tool_radius
            )
        else:
            self.cut_axis_start = (
                self.cutting_center
                - (self.cut_distance / 2)
                - self.enter_exit_safe_distance
                - self.tool_radius
            )
            self.cut_axis_end = (
                self.cutting_center
                + (self.cut_distance / 2)
                + self.enter_exit_safe_distance
                + self.tool_radius
            )

    def set_tool_path_directions(self, fm_path):
        if fm_path == self.pathList[0]:
            self.cut_axis = "x"
            self.step_axis = "y"
            self.cut_axis_location = "negative"
            self.step_axis_location = "positive"
        elif fm_path == self.pathList[1]:
            self.cut_axis = "x"
            self.step_axis = "y"
            self.cut_axis_location = "positive"
            self.step_axis_location = "negative"
        elif fm_path == self.pathList[2]:
            self.cut_axis = "y"
            self.step_axis = "x"
            self.cut_axis_location = "positive"
            self.step_axis_location = "positive"
        elif fm_path == self.pathList[3]:
            self.cut_axis = "y"
            self.step_axis = "x"
            self.cut_axis_location = "negative"
            self.step_axis_location = "negative"
        elif fm_path == self.pathList[4]:
            self.cut_axis = "x"
            self.step_axis = "y"
            self.cut_axis_location = "negative"
            self.step_axis_location = "positive"
        elif fm_path == self.pathList[5]:
            self.cut_axis = "y"
            self.step_axis = "x"
            self.cut_axis_location = "negative"
            self.step_axis_location = "negative"

    def reset_step_over_position(self):
        self.cut_axis_location_current = self.cut_axis_location
        if self.shape_data["shape"] == "circle":
            self.current_step_over_position = self.step_axis_start
            self.c_squared = self.step_halves

        elif self.shape_data["shape"] == "rectangle":
            self.current_step_over_position = self.step_axis_start

    def reset_cut_axis_location(self):
        self.cut_axis_location_current = self.cut_axis_location
        self.update_cut_position()

    def get_number_of_steps(self):
        return self.number_of_steps

    def get_formatted_axis_lines(self):
        if self.cut_axis == "x":
            x = f"X{round(self.cut_axis_start, 3)}"
            y = f"Y{round(self.current_step_over_position, 3)}"
            cut_end = f"X{round(self.cut_axis_end, 3)}"
        else:
            x = f"X{round(self.current_step_over_position, 3)}"
            y = f"Y{round(self.cut_axis_start, 3)}"
            cut_end = f"Y{round(self.cut_axis_end, 3)}"
        return x, y, cut_end

    def update_tool_position(self):
        self.update_step_over_position()
        self.update_cut_position()

    def update_cut_position(self):
        if self.shape_data["shape"] == "circle":
            self.cut_intercept = math.sqrt(
                (self.shape_radius + self.tool_radius) ** 2 - self.c_squared**2
            )
            if self.cut_axis_location_current == "positive":
                self.cut_axis_start = (
                    self.cutting_center
                    + self.cut_intercept
                    + self.enter_exit_safe_distance
                )
                self.cut_axis_end = (
                    self.cutting_center
                    - self.cut_intercept
                    - self.enter_exit_safe_distance
                )
            else:
                self.cut_axis_start = (
                    self.cutting_center
                    - self.cut_intercept
                    - self.enter_exit_safe_distance
                )
                self.cut_axis_end = (
                    self.cutting_center
                    + self.cut_intercept
                    + self.enter_exit_safe_distance
                )
        elif self.shape_data["shape"] == "rectangle":
            if self.cut_axis_location_current == "positive":
                self.cut_axis_start = (
                    self.cutting_center
                    + (self.cut_distance / 2)
                    + self.enter_exit_safe_distance
                    + self.tool_radius
                )
                self.cut_axis_end = (
                    self.cutting_center
                    - (self.cut_distance / 2)
                    - self.enter_exit_safe_distance
                    - self.tool_radius
                )
            else:
                self.cut_axis_start = (
                    self.cutting_center
                    - (self.cut_distance / 2)
                    - self.enter_exit_safe_distance
                    - self.tool_radius
                )
                self.cut_axis_end = (
                    self.cutting_center
                    + (self.cut_distance / 2)
                    + self.enter_exit_safe_distance
                    + self.tool_radius
                )

    def update_step_over_position(self):
        if self.shape_data["shape"] == "circle":
            if self.step_axis_location == "positive":
                self.current_step_over_position -= self.tool_step_over
                self.c_squared -= self.tool_step_over
            else:
                self.current_step_over_position += self.tool_step_over
                self.c_squared -= self.tool_step_over

        elif self.shape_data["shape"] == "rectangle":
            if self.step_axis_location == "positive":
                self.current_step_over_position -= self.tool_step_over
            else:
                self.current_step_over_position += self.tool_step_over

    def path_is_one_direction(self):
        return self.fm_path in self.pathList[:4]

    def flip_cut_axis_location_current(self):
        if self.cut_axis_location_current == "positive":
            self.cut_axis_location_current = "negative"
        else:
            self.cut_axis_location_current = "positive"

    def print_instance_variables(self):
        for attr, value in self.__dict__.items():
            print(f"{attr}: {value}")

    def does_cross_over_center(self):
        if self.shape_data["shape"] == "rectangle":
            return False

        if self.step_axis_location == "positive":
            self.next_step_over = self.current_step_over_position - self.tool_step_over
        else:
            self.next_step_over = self.current_step_over_position + self.tool_step_over

        if (
            self.next_step_over < self.step_over_center
            and self.current_step_over_position > self.step_over_center
        ):
            return True
        elif (
            self.next_step_over > self.step_over_center
            and self.current_step_over_position < self.step_over_center
        ):
            return True

        return False

    def get_cross_over_center(self):
        radius = float(self.shape_data["radius"])
        if self.step_axis == "x":
            if self.cut_axis_location_current == "positive":
                x_pos = self.step_over_center
                y_pos = self.step_over_center - (
                    radius + self.tool_radius + self.enter_exit_safe_distance
                )
            else:
                x_pos = self.step_over_center
                y_pos = self.step_over_center + (
                    radius + self.tool_radius + self.enter_exit_safe_distance
                )
        else:
            if self.cut_axis_location_current == "positive":
                x_pos = self.step_over_center - (
                    radius + self.tool_radius + self.enter_exit_safe_distance
                )
                y_pos = self.step_over_center
            else:
                x_pos = self.step_over_center + (
                    radius + self.tool_radius + self.enter_exit_safe_distance
                )
                y_pos = self.step_over_center

        x = f"X{round(x_pos, 4)}"
        y = f"Y{round(y_pos, 4)}"

        return x, y
