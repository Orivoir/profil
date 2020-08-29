# Profil Samuel GABORIEAU

> this repository is my profil app

## Tree

- / root
  - / store
    - / portfolios
      - {id}.json
  - / lib
    - / storage
      - storage.js
    - / routes
      - autoload.js
      / index
        - home.js
        - contact.js
      / admin
        - login.js
        - logout.js
        - profil-picture.js
        - add-portfolio.js
        - update-portfolio.js
        - delete-portfolio.js
  - index.js ( entry point web server )
  - package.json
  - config.json
  - / views
      - index.html
      - admin.html
  - / public
    - package.json
    - webpack.config.js
    - / src
      - / main-content
        - index.meta.js
        - admin.meta.js
      - / api
        - index.js
        - admin.js
      - index.js
      - admin.js
      - base.css
      - / components
        - / Notif
          - Notif.js
          - Notif.css
        - / Form
          - Form.js
          - Form.css
        - / ButtonUI
          - ButtonUI.js
          - ButtonUI.css
      - / Index
          - App.js
          - / Header
            - Header.js
            - Header.css
            - / Nav
              - Nav.js
              - Nav.css
          - / Portfolio
            - Portfolio.js
            - Portfolio.css
          - / Welcome
            - Welcome.js
            - Welcome.css
          - / Contact
            - Contact.js
            - Contact.css
          - / Footer
            - Footer.js
            - Footer.css
      - / Admin
        - App.js
        - / Header
          - Header.js
          - Header.css
            - / Nav
              - Nav.js
              - Nav.css
        - / Login
          - Login.js
          - Login.css
        - / Dashboard
          - Dashboard.js
          - Dashboard.css
        - / MessageBox
          - MessageBox.js
          - MessageBox.css
            - / MessageItem
              - MessageItem.js
              - MessageItem.css
    - / dist
      - index.js
      - admin.js


## Routes

- **GET** *"/"* **text/html** ( entry point client app )

- **POST** */api/contact* **application/json** ( create a new contact message )
  - post params
    - owner: string,
    - object: ?string,
    - contentText: string

- **GET** *"/admin"* **text/html** ( entry point client admin app )

- **POST** *"/api/admin/login"* **application/json**
  - post param:
    - login: string,
    - password: string

- **GET** *"/api/admin/logout?token={string}"* **application/json**

- **GET** *"/api/admin/messages?token={string}"* **application/json**

- **PUT** *"/api/admin/profil-picture?token={token}"* **application/json** ( upgrade profil picture )
  - put params:
    - profil: File

- **POST** *"/api/admin/portfolio?token={token}"* **application/json** ( create a new banner project )
  - post param:
    - title: string,
    - url: string,
    - image: File

- **PUT** *"/api/admin/portfolio/:id?token={token}"* **application/json** ( update banner project )
  - post param:
    - title: ?string,
    - url: ?string,
    - image: ?File

- **DELETE** *"/api/admin/portfolio/:id?token={token}"* **application/json** ( delete a banner project )


{JavaScript} && Enjoy <3
