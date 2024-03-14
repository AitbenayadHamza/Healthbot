from flask import Flask, request, jsonify
from flask_cors import CORS
from chatgui import chatbot_response

app = Flask(__name__)
CORS(app)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    message = data['message']
    response = chatbot_response(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
