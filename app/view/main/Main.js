Ext.define('LoginApp.view.main.Main', {
    extend: 'Ext.container.Container',

    requires: [
        'LoginApp.view.main.MainController',
        'LoginApp.view.main.MainModel'
    ],

    xtype: 'app-main',

    controller: 'main',
    plugins: 'viewport',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    title: 'Main Page',
    fullscreen: true,
    bodyPadding: 20,

    items: [
        {
            xtype: 'toolbar',
            region: 'north',
            height: 50,
            padding: 10,
            items: [
                {
                    xtype: 'component',
                    html: '<h2>Главная страница</h2>',
                    flex: 1
                },
                {
                    text: 'Товары',
                    handler: function () {
                        const tabPanel = Ext.ComponentQuery.query('#mainTabs')[0];

                        tabPanel.add({
                            title: 'Товары',
                            closable: true,
                            xtype: 'goodspanel'
                        }).show();
                    }

                },
                {
                    text: 'Выход',
                    handler: 'onClickButton'
                }
            ]
        },

        {
            xtype: 'tabpanel',
            region: 'center',
            itemId: 'mainTabs',
            items: [
                {
                    title: 'Главная',
                    html: '<p>Добро пожаловать :)</p><p> Для поиска товаров нажмите на кнопку в верхней правой части страницы.</p>'
                }
            ]
        }
    ]
});


