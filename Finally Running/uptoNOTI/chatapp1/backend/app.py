
####new


from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Pre-defined questions and responses
pre_defined_questions = [
    {"question": "Is this chat app secure?", "response": "Yes, it is fully secured with JWT."},
    {"question": "Can I create a group chat?", "response": "Yes, you can create group chats with ease."},
    {"question": "How do I create a group?", "response": "Go to the groups tab, click on create, and add members."},
    {"question": "Is there a dark mode?", "response": "No, But we will implement it soon."},
    {"question": "Can i add members in group?", "response": "Yes, You can add members by Clicking on eye option."},
     {"question": "Can i remove members from group?", "response": "Yes, You can remove members by Clicking on eye option but only if you are admin."}
]

# To track user sessions (for demonstration purposes, only in memory)
user_sessions = {}


@app.route('/api/init', methods=['POST'])
def init_chat():
    # Generate a unique session ID
    session_id = str(uuid.uuid4())  # Creating a unique session ID
    user_sessions[session_id] = {"name": None}  # Initialize session

    # Return a welcome message and the session ID to the frontend
    return jsonify({
        'message': "Hello, welcome! Please enter your name.",
        'session_id': session_id  # Send back the generated session ID
    })

@app.route('/api/chat/b', methods=['POST'])
def chat():
    session_id = request.json.get('session_id')
    user_input = request.json.get('message')

    print(f"Received session_id: {session_id}")
    print(f"User sessions: {user_sessions}")

    if session_id not in user_sessions:
        return jsonify({'message': 'Invalid session. Please start a new session.'})

    user_session = user_sessions[session_id]

    # If the name is not provided yet, ask for the name
    if not user_session["name"]:
        user_session["name"] = user_input  # Assuming user responds with their name
        return jsonify({
            'message': f"Hello {user_session['name']}! How can I assist you today?",
            'questions': [
                {"question": "Is this chat app secure?"},
                {"question": "Can I create a group chat?"},
                {"question": "How do I create a group?"},
                {"question": "Can I add members in group?"},
                {"question": "Can I remove members from group?"},
                {"question": "Is there a dark mode?"}
            ]
        })

    # Handle predefined questions
    for item in pre_defined_questions:
        if item["question"].lower() in user_input.lower():
            return jsonify({
                'message': item["response"],
                'follow_up': "Anything more I can help you with?",  # Follow-up message
                'questions': [
                    {"question": "Is this chat app secure?"},
                    {"question": "Can I create a group chat?"},
                    {"question": "How do I create a group?"},
                    {"question": "Can I add members in group?"},
                    {"question": "Can I remove members from group?"},
                    {"question": "Is there a dark mode?"}
                ]
            })

    # If the question doesn't match
    return jsonify({
        'message': "I'm sorry, I didn't understand your question. Here are some things you can ask:",
        'follow_up': "Anything more I can help you with?",  # Follow-up message
        'questions': [
            {"question": "Is this chat app secure?"},
            {"question": "Can I create a group chat?"},
            {"question": "How do I create a group?"},
            {"question": "Can I add members in group?"},
            {"question": "Can I remove members from group?"},
            {"question": "Is there a dark mode?"}
        ]
    })

if __name__ == '__main__':
    app.run(debug=True)




















# In Python, __name__ is a special variable that stores the name of the module being executed.

# If a Python script is being run directly (not imported as a module), __name__ is set to "__main__".

# The condition if __name__ == '__main__': ensures that the code inside it runs only when the script is executed directly, and not when it's imported into another script.

