Ext.define('LoginApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function (button) {
        var form = button.up('form').getForm();
        var values = form.getValues();

        // ---- credentials check ----
        if (values.username === 'admin' && values.password === 'padmin') {
            this.getView().close();
            Ext.create('LoginApp.view.main.Main');
        } else {
            Ext.Msg.alert('Ошибка', 'Неверное имя пользователя или пароль!');
        }

        // --- NO credentials check ----
        // this.getView().close();
        // Ext.create('LoginApp.view.main.Main');
    }
});

