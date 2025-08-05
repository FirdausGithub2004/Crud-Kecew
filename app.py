from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory database
data = [
    {"id": 1, "name": "Contoh Nama", "email": "contoh@email.com"}
]
next_id = 2

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def add_data():
    global next_id
    new_item = request.json
    new_item['id'] = next_id
    data.append(new_item)
    next_id += 1
    return jsonify(new_item), 201

@app.route('/api/data/<int:item_id>', methods=['PUT'])
def update_data(item_id):
    item_to_update = next((item for item in data if item['id'] == item_id), None)
    if item_to_update:
        update_info = request.json
        item_to_update['name'] = update_info.get('name', item_to_update['name'])
        item_to_update['email'] = update_info.get('email', item_to_update['email'])
        return jsonify(item_to_update)
    return jsonify({"error": "Item not found"}), 404

@app.route('/api/data/<int:item_id>', methods=['DELETE'])
def delete_data(item_id):
    global data
    item_to_delete = next((item for item in data if item['id'] == item_id), None)
    if item_to_delete:
        data.remove(item_to_delete)
        return jsonify({"success": True})
    return jsonify({"error": "Item not found"}), 404

if __name__ == '__main__':
    app.run(port=5001)
