# To Run

1. `npm install`
2. `npm run start`

# Thoughts

1. What value is redux providing for us here? React's context + hooks give us almost all of the functionality redux provides with the exception of "guaranteeing" immutability (just an abstraction around a copy/replace pattern).
2. For the modals, it wasn't clear if we wanted the query params to be universally accepted as a way to display the views or not. Since react-router doesn't really "do" query params, the options were to either have each modal listen globally and conditionally render based on the useLocation params or to have the modals exist as children inside the list views. I opted for the former, even though it feels gross to have the conditional for each modal's render.
3. The lot images were not accessible by manually adding the extension. However, they were accessible directly as listed. e.g. https://storage.googleapis.com/plot_images/1018314458 works but "https://storage.googleapis.com/plot_images/1018314458.png" does not
4. I wanted to do a lot more with the UI feedback such as the "favorites" filtering, but didn't want to put in the extra time.
5. Styling wise, I would have taken the time to make sure the images only show up in the correct aspect ratio. This is typically done using a "padding hack" with absolutely positioned elements. I know there is a new aspect-ratio css property but I don't know how widely adopted it is yet. Also, I hope it doesn't need to be said but in a real project I wouldn't leave everything as inline styles. That is simply how I started in order to iterate faster, especially since instructions were to ignore styling for the time being.
6. Please peruse the comments in various components that explain certain decisions, such as when to be DRY or not.
