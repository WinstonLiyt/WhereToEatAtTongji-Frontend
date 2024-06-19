## TJ 今天吃什么 🍜

Welcome to "TJ 今天吃什么" 🍜, a WeChat mini-program designed to help Tongji University students and nearby residents decide what to eat! You can find our frontend code [here](https://github.com/WinstonLiyt/WhereToEatAtTongji-Frontend) and backend code [here](https://github.com/WinstonLiyt/WhereToEatAtTongji-Backend).

### Introduction

"TJ 今天吃什么" aims to solve the daily dilemma of "What to eat?" by providing personalized recommendations and detailed restaurant information within and around Tongji University. The platform supports student and merchant interactions, community discussions, and user reviews.

### Features

- **User Registration and Login**: Supports registration via WeChat login. 📲
- **Restaurant and Dish Management**: Merchants can manage their menus, including adding, editing, and deleting dishes. 🍛
- **Personalized Recommendations**: Users receive recommendations based on their preferences and browsing history. 🧑‍🍳
- **Community Interaction**: Users can post, comment, like, and share their food experiences. 💬
- **Admin Controls**: Admins can manage user permissions, monitor activities, and handle reports. 🔧

### Installation

#### Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/tj-eat-frontend.git
   cd tj-eat-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm start
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

#### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/tj-eat-backend.git
   cd tj-eat-backend
   ```

2. **Set Up Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Database Configuration**:
   - Ensure MySQL is installed and running.
   - Update the database configuration in `tjeatwhat/settings.py`:
     ```python
     DATABASES = {
         'default': {
             'ENGINE': 'django.db.backends.mysql',
             'NAME': 'TJEatWhat',
             'USER': 'root',
             'PASSWORD': 'yourpassword',
             'HOST': 'localhost',
             'PORT': '3306',
         }
     }
     ```

5. **Run Migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Run the Server**:
   ```bash
   python manage.py runserver
   ```

### Usage

#### User Guide

- **Browsing Restaurants**: Users can view all available restaurants and filter by categories. 🍽️
- **Viewing Dishes**: Detailed pages for each dish with options to rate and review. ⭐
- **Community**: Interact with other users by posting and commenting on food-related topics. 🗣️
- **Recommendations**: Use the personalized or random recommendation features to discover new dishes. 🎲

#### Merchant Guide

- **Edit Information**: Merchants can edit their restaurant's information such as name, address, and description. 🏪
- **Add Dishes**: Merchants can add new dishes to their menu, including uploading images and setting prices. 🍲
- **Reply to Comments**: Merchants can respond to user reviews and comments on their dishes. ✍️

#### Admin Guide

- **User Management**: View and edit user information, manage permissions, and handle reports. 🛠️
- **Notifications**: Admins can see user interactions like comments, likes, and collections. 📬

### Contributing

We welcome contributions from the community! Please follow these steps:

1. Fork the repository. 🍴
2. Create a new branch (`git checkout -b feature-branch`). 🌿
3. Make your changes and commit them (`git commit -m 'Add new feature'`). ✍️
4. Push to the branch (`git push origin feature-branch`). 🚀
5. Open a pull request. 🔄

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Thank you for using "TJ 今天吃什么"! 🍴 Enjoy your meals!
