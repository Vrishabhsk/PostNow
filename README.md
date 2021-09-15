# PostNow

## Methodology
- First the data is fetched from the API and stored as an array of Posts
- The array is passed to the UI-Kitten (Styling Library) List (Similar to RN Flatlist) for rendering the first 10 posts with their 
title and body along with a button to view particular post.
- On reaching the end of the flatlist, a spinner is activated and next 10 posts are loaded.
- On reaching the limit which in this case is 100 posts, the spinner is no longer rendered.
- On viewing a post, another screen opened in which the title, body and comment sections are shown.
- A user can posts new comments which are saved locally for future reference.

## Shortcuts Applied
- The entire data is fetched on first render but is shown sequentially in a pack of 10 posts as mentioned in the tasks.

## Getting Started with the project
- Clone the repo
```
git clone https://github.com/Vrishabhsk/PostNow.git
```
- Install the dependancies
```
npm install (or) yarn add
```
- Run your emulator and start the expo server (android)
```
yarn android
```

## Libraries Used

- Navigation: @react-navigation
- Fetch Requests: axios
- Storage: expo-secure-store
- Styling: @ui-kitten
