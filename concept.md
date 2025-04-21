# EduFeed: A decentralized and interoperable educational content feed

## Description

**Hinweis:** Die Programmiersprache ist Englisch, jedoch soll die gesamte Benutzeroberfläche (User Interface) auf **Deutsch** sein.

This prototype demonstrates the core functionality of **EduFeed**, a simulated decentralized infrastructure using a local **event log stored in the browser** (instead of the Nostr protocol) to enable the cross-platform exchange of **Open Educational Resources (OER)**. It is designed for a **maximum 10-minute live presentation** to showcase the potential of EduFeed.

## Core Demonstrated Functionality
1. **Creation of new users** with simple local identities, including credentials stored in LocalStorage and a UI to switch between them.
2. **Publishing educational content** (a learning material as simple text), with the option to search existing materials and start from or remix another user's content.
3. **Logging all user actions** (publishing, liking, curating, etc.) in a shared browser-based event log for transparency and traceability.
4. **Displaying the event feed** with educational content in real-time using React Context, enabling live updates.
5. **Curation and trust features**, allowing users to mark OER as "High-Quality", follow trust links between users, and highlight curated content in searches.
6. **Admin functionality** including viewing all users, switching roles, examining the full event log for presentation/debugging, and displaying statistics on content creation, likes, and reuse.

## Goal
To provide a compelling, tangible example of how EduFeed enables platform-independent collaboration and content sharing using a simple local-first approach.

## Components to be Implemented
- **React Context** for managing a global event log in-browser
- **User management** via LocalStorage (name only, no auth for simplicity)
- **Input form** for adding new learning materials (text only)
- **Event feed** displaying published learning materials in chronological order
- **Responsive UI** for both desktop and mobile devices
- **Admin area** for ecosystem configuration and management

### Admin Area Views
1. **User Panel**
   - Display a list of all users stored in the local storage
   - Ability to create new users with simple credentials (stored in LocalStorage)
   - Ability to log in as one of the users created by the admin
   - View which users have been created by the current session

2. **Edu-Feed View**
   - Display the current state of the full event log (including who posted what and when)
   - Useful for debugging and auditing purposes
   - Offers an intuitive and visual overview of the EduFeed ecosystem
   - Helps with presenting the concept and understanding how interactions are recorded and reflected in the system

3. **Statistics View**
   - Show aggregated statistics such as:
     - Total number of likes
     - Total number of OER created
     - Number of OER that have been reused/remixed

### User Area Views (after login)


1. **Content View**
   - Create a new learning material (simple text input)
   - Search existing materials in the event log
   - Start from another material (remix/duplicate)

2. **Explore View**
   - Browse educational content created by others
   - Like content items
   - Mark content as "High-Quality OER" (curate)

3. **Notification View**
   - See notifications when:
     - Someone liked your OER
     - Someone created new OER based on your original content
4. **Trust & Curation View**
   - View which users have curated (marked as "High-Quality OER") content from other users
   - Indicate which users you personally trust
   - When searching for learning materials, content curated by trusted users is prioritized or highlighted

## Technologies
- JavaScript/TypeScript
- React (with Context API and Hooks)
- LocalStorage (for persistence)
- **Mantine component library** for responsive and accessible UI

## Intended Outcome
After running the prototype, the audience should see and understand the power of **EduFeed** and how collaboration in an educational space can be implemented using a decentralized architecture. The prototype should make it clear how:
- Educational content can be easily exchanged across platform boundaries
- Trust and curation mechanisms support discovery and reuse
- A decentralized event log (e.g., based on Nostr principles) enables real-time, transparent interaction
- Simple UI patterns with technologies like **React Context** and **Mantine** can illustrate federated collaboration effectively

