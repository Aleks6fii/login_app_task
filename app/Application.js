/**
 * The main application class. An instance of this class is created by `app.js` when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('LoginApp.Application', {
    extend: 'Ext.app.Application',

    name: 'LoginApp',

    stores: [
        // TODO: add global / shared stores here
    ],
    views: [
        'LoginApp.view.login.Login',
        'LoginApp.view.main.Main'
    ],
    launch: function () {

        // It's important to note that this type of application could use
        // any type of storage, i.e., Cookies, LocalStorage, etc.
        var loggedIn;

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("TutorialLoggedIn");

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view
        Ext.widget(loggedIn ? 'app-main' : 'login');

    }
});