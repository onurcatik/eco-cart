
# Full-Stack E-Commerce Platform

This project demonstrates how to build a professional-grade shopping platform from scratch, including advanced features like payment integration (PayPal & Stripe), an admin dashboard, user authentication, and more.

## Features

- Full-featured E-Commerce platform.
- Authentication system with Next Auth.
- PayPal, Stripe, and Cash on Delivery payment options.
- User account management, order history, and profile updates.
- Admin dashboard with product, order, and user management.
- Shopping cart with session and JWT integration.
- Product reviews and ratings system.
- Search filtering, product carousel, and category drawer.
- Email purchase receipts using Resend service.
- Image uploading with Uploadthing.
- Monthly sales chart and admin stats with Recharts.


## Technologies and Tools

This project leverages the following technologies:

- **Frontend:** Next.js (v15), React (v19), Tailwind CSS, ShadCN UI
- **Backend:** PostgreSQL, Prisma ORM, Next Auth, Zod for validation
- **Payments:** PayPal API, Stripe API
- **Forms:** React Hook Form
- **Testing:** Jest
- **Visualization:** Recharts
- **Email Services:** Resend
- **Image Uploading:** Uploadthing
- **Other:** ES Lint for linting, TypeScript for type-safe code

## Project Overview

This project is designed for developers with prior experience in React and a basic understanding of Next.js. It provides an in-depth guide on how to integrate various tools and technologies to build a production-ready e-commerce application.

### Project Structure

1. **Introduction**
   - Overview of the project, stack, and objectives.

2. **App Creation & Basic Layout**
   - Project setup, layout creation, ShadCN UI components, theme toggler, loading pages.

3. **Database, Prisma & Product Display**
   - Setting up Neon PostgreSQL, Prisma ORM, creating models, migrations, and seeding data.

4. **Authentication With Next Auth**
   - Full authentication implementation.

5. **Add To Cart**
   - Shopping cart system with database and session integration.

6. **Cart & Shipping Pages**
   - Checkout process setup with cart summary and shipping address form.

7. **Payment Method & Order Pages**
   - Additional checkout pages for order completion.

8. **PayPal Payments**
   - PayPal API integration and unit testing with Jest.

9. **Order History & User Profile**
   - User dashboard with order history and profile update functionality.

10. **Admin Dashboard**
    - Overview page for admin with statistics and monthly sales chart.

11. **Admin Products & Image Uploading**
    - Product management and image uploads using Uploadthing.

12. **Admin Users & Search**
    - User management and search functionality for products, orders, and users.

13. **Drawer, Carousel, and Search**
    - Category drawer, featured product carousel, and search filters.

14. **Ratings & Reviews**
    - Implementing a product review and rating system.

15. **Stripe Payments**
    - Stripe API integration for handling payments.

16. **Email Purchase Receipts**
    - Email integration using Resend service.

17. **Homepage Components & Wrap Up**
    - Finalizing homepage components and project wrap-up.

18. **Notes & Fixes**
    - Troubleshooting and common fixes.

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/onurcatik/e-commerce.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file with the required environment variables for database, authentication, and API keys.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.





