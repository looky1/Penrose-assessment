# Penrose Assessment - Junior Developer
# Mini Library Finder
A polished web application that implements all assessment requirements plus every optional "nice-to-have" feature. Built with clean, accessible code and a focus on user experience.

# 🎯 Assessment Completion
# ✅ All Core Requirements Implemented
Search: Debounced input (300ms) with title/author filtering and result highlighting
Filter & Sort: Genre dropdown and sort options working seamlessly together
Results: Live count, full keyboard navigation (↑/↓ + Enter), empty state handling
Reading List: Persistent add/remove with localStorage, displayed in side panel
Accessibility: Proper labels, ARIA attributes, visible focus indicators
Responsiveness: Optimized for 360x640 mobile and desktop layouts

# 🌟 All Nice-to-Have Features Added
URL State Management: Search/filter/sort preserved in query parameters
Keyboard Shortcuts: Press "/" to focus search field instantly
Unit Testing: Built-in assertion for highlight function validation

# 🚀 Demo & Setup
# Live Demo
https://looky1.github.io/Penrose-assessment/
click link to go to the hosted project.

# Local Development
1. Open project in VS Code
2. Install "Live Server" extension
3. Right-click index.html → "Open with Live Server"

# 📁 Project Structure (As Specified)
/mini-library/          # Assessment submission folder
├── index.html         # Semantic HTML structure
├── styles.css         # Responsive CSS with dark theme
├── app.js            # JavaScript implementation
├── books.json        # book data (10 books, 5 genres)
└── README.md         # This documentation

# Root files for GitHub Pages functionality
├── index.html        # (Duplicate for hosting)
├── styles.css        # (Duplicate for hosting)  
├── app.js           # (Duplicate for hosting)
└── books.json       # (Duplicate for hosting)

# 🔧 Technical Implementation
# Architecture
State Management: Centralized state object with reactive updates
Event Handling: Debounced search, efficient DOM event delegation
Performance: Minimal DOM updates, efficient filtering/sorting

# Enhanced Features Beyond Requirements
Visual Feedback: Hover effects and smooth CSS transitions
Search Highlighting: Robust text matching with proper HTML escaping
Error Handling: Graceful localStorage fallbacks, input validation
Code Quality: Clean separation of concerns, reusable functions

# 🎨 Design Decisions
# User Experience
Dark Theme: Professional appearance with background imagery
Responsive Grid: Flexible layout adapting from mobile to desktop
Visual Hierarchy: Clear typography and spacing for readability
Interactive Feedback: Button states, hover effects, focus indicators

# 📋 Assessment Compliance
# Acceptance Checklist ✅
 Page loads books.json without console errors
 Typing updates results with debounce and highlighting
 Genre filter and sort work together; count updates correctly
 Add/remove items; reading list persists after refresh
 Keyboard support (Up/Down focus, Enter toggles)
 Accessible labels, ARIA, visible focus; responsive layout

 #image below is what the webpage looks like:
 <img width="1762" height="940" alt="pr" src="https://github.com/user-attachments/assets/c5809beb-ef2d-4b70-9b97-719d4ec51efa" />

 

 
