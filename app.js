/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'LoginApp.Application',

    name: 'LoginApp',

    requires: [
        // This will automatically load all classes in the Login namespace
        // so that application classes do not need to require each other.
        'LoginApp.*'
    ],

});
