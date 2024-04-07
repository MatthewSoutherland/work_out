from flask import Blueprint, render_template, request, jsonify, send_from_directory
import os
import json

home_bp = Blueprint("home_bp", __name__)


@home_bp.route("/", methods=["GET", "POST"])
def home():

    shape_dir = os.path.join("drawApp", "saved_shapes")
    files = [
        f for f in os.listdir(shape_dir) if os.path.isfile(os.path.join(shape_dir, f))
    ]

    if request.method == "POST":
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        file_name = data.get("fileName")
        shape_data = data.get("json")

        if not file_name or shape_data is None:
            return jsonify({"error": "Program details missing or incomplete"}), 400

        file_name = f"{file_name}.json"
        path = os.path.join("drawApp", "saved_shapes", file_name)

        try:
            with open(path, "w") as file:
                json.dump(shape_data, file, indent=4)
        except IOError as e:
            return jsonify({"error": "Failed to write data to file"}), 500

        return jsonify({"message": "Data uploaded successfully"}), 200

    return render_template("home.html", files=files)


@home_bp.route("/load-json/<string:file_name>", methods=["GET"])
def load_json(file_name):
    path = os.path.join("drawApp", "saved_shapes", file_name)

    with open(path, "r") as file:
        data = json.load(file)
        return jsonify(data)


@home_bp.route("/validation")
def validation():
    return render_template("validation.html")


@home_bp.route("/draw")
def draw():
    return render_template("drawClass.html")
