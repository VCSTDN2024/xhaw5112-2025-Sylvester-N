### GitHub link: 
https://github.com/VCSTDN2024/xhaw5112-2025-Sylvester-N.git 
### Empowering The Nation Website
A static, responsive website for the skills development organisation 'Empowering the Nation'. This platform is designed to highlight the organization's mission and training programs, and provide a clear, interactive way for prospective students to inquire about courses and pricing.

 <img width="1293" height="607" alt="Screenshot 2025-10-31 122921" src="https://github.com/user-attachments/assets/59516f01-c7dd-40d0-9895-c507ec83233f" />

## Project Overview
Empowering The Nation, founded by Precious Radebe in 2022 and based in Johannesburg, focuses on empowering individuals who have limited formal education by equipping them with marketable, practical skills. The training programs aim to help students secure better employment or start their own small businesses.
The website provides a professional, user-friendly interface with a clean aesthetic built around a Dark/Light/Green/Teal colour palette.

## Key Features
Comprehensive Course Catalogue: The site clearly separates and details the two main program offerings:
-	Six-Month Learnerships: Professional programs including Construction, Electrical, Plumbing, and Landscaping. (See coursepage1.html)
-	Six-Week Short Skills Training Programmes: Focused, practical courses such as Cooking, Child Minding, and Garden Maintenance. (See coursepage2.html)
•	Interactive Enquiry & Discount Calculator: The dedicated Enquiry page (enquirypage.html) uses JavaScript to allow students to select multiple courses and instantly calculate the final price, including applicable discounts.
•	Multi-Course Discount System: Discounts are automatically applied based on the number of courses selected:
-	2 Courses: 5% Discount
-	3 Courses: 10% Discount
-	4+ Courses: 15% Discount
•	Clear Contact Information: The Contact Us page provides essential details, including a phone number (011 324 0000), email address (info@empoweringthenation.org), and an embedded map location.
## File Structure
The project uses a standard structure for a static site:
# File Name	Description
- homepage.html	The main landing page, introducing the mission and programs.
- aboutpage.html	Details about the organization, its mission, and its founder.
- coursepage1.html	The Six-Month Learnership course listings.
- coursepage2.html	The Six-Week Short Skills course listings.
- enquirypage.html	The interactive course selection and discount calculation page.
- contactpage.html	Contact information and location map.
- styles.css	Primary global styling for the website.
- styles1.css	Secondary styling sheet (used for course page 2).
- Images/	Directory for all site assets (logo, social icons, etc.).

## Technologies Used
-	HTML5: For structuring the content.
-	CSS3: For styling, layout, and mobile responsiveness.
-	JavaScript: Used on enquirypage.html for dynamic cost calculation.
## Website Wireframe

<img width="1288" height="483" alt="Screenshot 2025-10-31 123031" src="https://github.com/user-attachments/assets/ebe9e3b0-33e3-4747-b4df-af4d9b584ba9" />

https://www.figma.com/design/cArRjQ6lG04ujaKADrS9jx/Untitled?node-id=0-1&t=SwUhWuX7zZB8LcIQ-1 

### Empowering The Nation Mobile Application
This repository contains the source code for the official mobile application of Empowering the Nation, a skills development organisation. The application is built using React Native and TypeScript to provide a seamless, native experience for prospective students to view courses and calculate enrolment costs.
 
<img width="350" height="643" alt="Screenshot 2025-10-31 123006" src="https://github.com/user-attachments/assets/b8583b16-4ede-41bc-9cbf-f2e91ee93125" />

## Project Description
The Empowering the Nation app translates the organisation's mission and course catalogue into a dynamic mobile platform. The core functionality is to allow users to browse available courses and use an interactive calculator to determine the final tuition price, factoring in multi-course discounts.

## Key Features
The application mirrors the core features of the main website while offering a mobile-optimized user interface:
•	Platform: Built with React Native for cross-platform iOS and Android compatibility.
•	Theming: Adheres to the established brand identity with a Professional Green (#388e3c) accent colour, Near-Black text, and a clean, modern aesthetic.
•	Comprehensive Course Catalog: Displays detailed information for:
-	Six-Month Learnerships (e.g., Construction, Electrical).
-	Six-Week Short Skills Training Programmes (e.g., Cooking, Child Minding).
•	Interactive Enrolments Calculator: Users can select multiple courses, and the application instantly calculates the final cost.
•	Automatic Multi-Course Discount System: Discounts are applied automatically based on the number of courses selected, following the official organization policy:
-	2 Courses: 5% Discount
-	3 Courses: 10% Discount
-	4+ Courses: 15% Discount
•	Contact & About Information: Dedicated screens for viewing organisational details, mission, and contact information.

## Technology Stack
-	Framework: React Native
-	Language: TypeScript
-	Styling: React Native StyleSheet for native component styling.
-	State Management: React Hooks (useState, useMemo).

## File Structure (Root Level)
# File Name	Description
- App.tsx	The main application file containing all components, data structures, constants, and the interactive logic for the entire app (e.g., course calculator, navigation logic).
- package.json	Defines project dependencies and scripts.
- app.json	Expo configuration file.
- [Image files]	Local assets (.webp, .jpeg) for course images referenced in App.tsx.

## Website Wireframe

https://www.figma.com/design/BMJOXqmXWnPETy4BJjGvGm/Untitled?node-id=0-1&t=ZYndY1BjGMXWCC1h-1
 
<img width="695" height="364" alt="Screenshot 2025-10-31 123047" src="https://github.com/user-attachments/assets/ac0323d2-48ed-4478-9c1a-faf8cbf8c373" />

## Styling
The application adheres to the defined colour palette:
# Variable	Colour Code	Description
- ACCENT_COLOR	#388e3c	Primary action and branding colour (Professional Green).
- DARK_COLOR	#1d1d1f	Primary text and dark elements (Near Black).
- LIGHT_COLOR	#ffffff	Backgrounds and main content areas (White).
- GRAY_BG	#f5f5f7	Subtle section breaks (Light Gray).


