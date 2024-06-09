# Viaro: Photo Gallery  App

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/viaro-photo-gallery.git
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Set up Firebase:**
    - i had provided the firebase config file in the src folder, you can replace it with your own firebase config file.
4. **Start the development server:**
    ```bash
    npm run dev
    ```
## Features
- User authentication and Authorization: Secure sign-up, sign-in, and password reset functionality. The application conserves the user's state even if the tab is closed, using Redux Toolkit.
- State Management with Redux Toolkit: Efficient state management across the application ensuring smooth and consistent user experiences.
- Handling Forms with Formik and Yup: Formik is used to manage forms and form validation, ensuring a seamless user experience.
- Responsive Design: The application is fully responsive and optimized for various screen sizes.
- Image Grid: A grid of images is displayed on the home page, with the ability to mark images as favorites.
- Favorites Page: A dedicated page to view and manage the user's favorite images.
- Photo Card Functionalities: Each photo card includes features to:
    - View the image in full screen.
    - Mark the image as a favorite.
    - Remove the image from the favorites list.
