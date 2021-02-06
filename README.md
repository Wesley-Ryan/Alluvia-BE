# Alluvia

Subscription Tracker.

# Routes:

<details>
<summary># Sign Up</summary>
<br>
Used to register a new User account.

**URL** : `/account/signup/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "first_name": "[first name]",
  "last_name": "[last name]",
  "email": "[valid email address]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "first_name": "John",
  "last_name": "$Dough$",
  "email": "JohnsGotTheDough@alluvia.com",
  "password": "password1-:)"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Welcome username",
  "token": "really secret saucy token",
  "role": 1,
  "id": 1
}
```

## Error Response

**Condition** : If 'missing fields'.

**Code** : `401 BAD REQUEST`

**Content** :

```json
{
  "message": ["Missing Required Fields."]
}
```

**Condition** : If 'Email is not unique'.

**Code** : `401 BAD REQUEST`

**Content** :

```json
{
  "message": ["Username is taken :(, please choose a unique username."]
}
```

---

<br><br>

</details>
