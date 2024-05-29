import json

import napkin
from napkin import request, response

import jsonschema
from jsonschema.exceptions import ValidationError


print("--- STATUS: Running! ---")

# just distinguishing from other identifiers
REQUEST = request
RESPONSE = response


def validate_request(data: dict):
    '''Ensure incoming POST request has the required properties for a Victory! card.
    
    Raises `jsonschema.exceptions.ValidationError` if validation fails.
    '''

    try:
        card_type = data["CardType"].lower()
    except KeyError:
        raise ValidationError("No card type supplied")

    with open(f"/opt/files/{card_type}-schema.json") as file:
        schema = json.load(file)

    jsonschema.validate(instance = data, schema = schema)


def save_card(request: napkin.request):
    '''Save a card to persistent memory store.'''

    body = request.body

    try:
        validate_request(body)
    except ValidationError as e:
        RESPONSE.status_code = 500

    napkin.store.put(body["id"], body)
    
    RESPONSE.body = {
        "saved-id": body["id"],
        "saved-card": body,
    }


def process_request(request: napkin.request):
    '''Process an incoming request.'''

    RESPONSE.status_code = 500

    try:
        match request.method:
            case "GET":
                request.status_code = 501
            case "PUT":
                save_card(request)
            case "POST":
                request.status_code = 501
                # save_idea(request)
    
    except Exception as e:
        RESPONSE.status_code = 500
        RESPONSE.body = e
        print(e)

    else:
        RESPONSE.status_code = 200


print(REQUEST)
process_request(REQUEST)
print(RESPONSE)
print("--- STATUS: Done! ---")
