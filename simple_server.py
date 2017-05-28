from flask import Flask, jsonify, request
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS, cross_origin
from database import contacts
app = Flask(__name__)
api = Api(app)
CORS(app)


def get_ids(key, inputData):
    return [subVal[key] for subVal in inputData if key in subVal]


def get_contact(contact_id):
    contact = [contact for contact in contacts if contact['id'] == int(contact_id)]
    if len(contact) == 0: abort(404)
    return jsonify({'contact': contact[0]})


def delete_contact(contact_id):
    for (index, contact) in enumerate(contacts):
        if contact["id"] == contact_id:
            del contacts[index]

parser = reqparse.RequestParser()
parser.add_argument('contacts')


class Todo(Resource):
    def delete(self, contact_id):
        print("id:", contact_id)
        delete_contact(int(contact_id))
        return contacts, 200


class TodoList(Resource):
    def get(self):
        return contacts

    def post(self):
        data = request.get_json(force=True)
        contact_id = max(get_ids('id', contacts)) + 1
        data["id"] = contact_id
        contacts.append(data)
        return contacts, 200


api.add_resource(TodoList, '/contacts')
api.add_resource(Todo, '/contacts/<contact_id>')


if __name__ == '__main__':
    app.run(debug=True)
