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

# Login

Used to collect a Token for a registered User.

**URL** : `/account/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "email": "[valid email address]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "username": "ilovesubscriptions@alluvia.com",
  "password": "password1:)"
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

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `401 BAD REQUEST`

**Content** :

```json
{
  "message": ["Invalid credentials, please try again."]
}
```

# Get User Dashboard

Used to register a new User account.

**URL** : `/user/:id/`

**Method** : `GET`

**Auth required** : YES: Token

**Data constraints**

```REQ HEADERS
{
  "Authorization": ["Token"]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Welcome username",
  "first_name": "John",
  "last_name": "$Dough$",
  "email": "JohnsGotTheDough@alluvia.com",
  "subscriptions": [{"subscription"},{"subscription"}]
}
```

## Error Response

**Condition** : If 'invalid token'.

**Code** : `401 BAD REQUEST`

**Content** :

```json
{
  "message": ["Access Denied."]
}
```

**Condition** : If 'User ID is not valid or differs from req.params'.

**Code** : `401 BAD REQUEST`

**Content** :

```json
{
  "message": ["You must have access to view this account."]
}
```
