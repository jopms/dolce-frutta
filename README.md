# DolceFrutta 🍊🇮🇹
## Your virtual gateway to premium Italian fresh fruits in Switzerland.

Savor daily imports, explore flavors, and experience Italy's bounty, all in a seamless React-powered online grocery shop.

Try the hosted version [here](https://dolce-frutta.netlify.app/).
## Product Explanation
Upon landing on the platform, the products and vendors are fetched.
With the search bar you can search through the selection of products. The vendors selector serves as a filter, allowing you to focus in the items that resonate with your preferences.
You can also add and remove items from your basket, which remains persistently accessible within your browser.
All the implementations were done taking into consideration the business aspect, with focus on mantaining a clean design.

## Tech Stacks
- React
- Redux
- Tailwind CSS
- Ant Design (antd)
- Internationalization (i18n) (for future expansion)
- Axios
- React Router (for future expansion)

## API
The project uses the [Predic8 API](https://api.predic8.de/shop/v2/swagger-ui/index.html#) to fetch products and vendors.

This API provides the necessary data to populate our online grocery shop with premium Italian fresh fruits.

The design was implemented to ensure that the user interactions with the online grocery shop remain smooth and responsive. The goal is to provide an enjoyable exploration of premium Italian fresh fruits, regardless of any potential delays in the API response.

Feel free to savor the flavors, explore the offerings, and experience the bounty of Italy's finest produce in our React-powered online grocery shop.

## Getting Started
Follow these steps to set up and run the DolceFrutta project locally on your machine.

### Prerequisites
Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org) (version 12 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager, comes with Node.js)
- [Yarn](https://yarnpkg.com/) (optional alternative to npm)

### Installation
1. Clone the repository to your local machine using the following command:

   ```sh
   git clone https://github.com/jopms/dolce-frutta.git

2. Navigate to the project directory:

   ```sh
   cd dolce-frutta

3. Install the project dependencies using npm or Yarn:
 - Using npm
   ```sh
   npm install

- Using yarn
   ```sh
   yarn
  
### Running the Application
1. Start the development server:

 - Using npm:
   ```sh
   npm dev

- Using yarn:
   ```sh
   yarn dev

### Building for Production
To build the project for production, use the following command:

 - Using npm:
    ```sh
    npm run build

- Using yarn:
    ```sh
    yarn run build

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).

