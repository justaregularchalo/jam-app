https://jam-app-project.netlify.app/

[Jam Logo] (./public/images/jam-logo.png)

Description

jam  is the place where the local music scene comes alive!
Connect with talented musicians in your area. Whether you're forming the band of your dreams or just jamming for the pure love of music, explore, collaborate, and unleash your musical potential with Jam. It's not just an app; it's a vibrant community where talent shines brighter when shared.
Discover nearby artists, dive into unforgettable jam sessions, and make your musical journey extraordinary. Join Jam today and let the magic of local music unfold—because in our world, the best tunes are those that echo together!

https://github.com/justaregularchalo/jam-app-client
https://github.com/justaregularchalo/jam-app-server

Backlog Functionalities

Match funcionality, maps, socialmedia and add video to show your skills

Technologies used

HTML, CSS, JS, REACT, AXIOS, NODE, MONGO

User Stories

404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
sign up - As a user I want to sign up on the webpage so that I can see all the events that I could attend
login - As a user I want to be able to log in on the webpage so that I can get back to my account
logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
all artist - As a user I want to see all the artists in the app
my profile - As a user i can see and edit all my profile fields and see received comments
artist in your area - As a user i can see all users near to me
artist from your genre - As a user i can see all users with the same music genre

<table border="1">
    <thead>
      <tr>
        <th>Path</th>
        <th>Page</th>
        <th>Components</th>
        <th>Permissions</th>
        <th>Behavior </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>/</td>
        <td>Login</td>
        <td>NavBar</td>
        <td>Public</td>
        <td>Login form and navigate to all artist</td>
      </tr>
      <tr>
        <td>/signup</td>
        <td>Signup</td>
        <td>NavBar</td>
        <td>Public</td>
        <td>Signup form and navigate to login</td>
      </tr>
      <tr>
        <td>/my-profile</td>
        <td>MyProfile</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Show my profile</td>
      </tr>
      <tr>
        <td>/artist</td>
        <td>AllUsers</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Show all artist</td>
      </tr>
      <tr>
        <td>/artists-your-area</td>
        <td>UsersInYourArea</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Show artists in your area</td>
      </tr>
      <tr>
        <td>/artists-your-genre</td>
        <td>UsersWithYourGenre</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Show artists from your genre</td>
      </tr>
      <tr>
        <td>/comment/comment/:commentId</td>
        <td>MyProfile</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Show comment in the profile</td>
      </tr>
      <tr>
        <td>/messages/:userId</td>
        <td>Messages</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Show message with the user</td>
      </tr>
      <tr>
        <td>/messages/message/:messageId</td>
        <td>Messages</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Delete message</td>
      </tr>
      <tr>
        <td>/profile/:userId</td>
        <td>ProfilePage</td>
        <td>NavBar</td>
        <td>Private</td>
        <td>Show user profile</td>
      </tr>
    </tbody>
  </table>

  Other Components
        Navbar

Services
        auth.login(user)
auth.signup(user)
auth.verify()
auth.logout

Context
auth.context

Links

Collaborators 
[link]https://github.com/justaregularchalo
[link]https://github.com/miguelreched

Projects
[link]https://github.com/justaregularchalo/jam-app-client
[link]https://github.com/justaregularchalo/jam-app-server
[link]https://jam-app-project.netlify.app/

