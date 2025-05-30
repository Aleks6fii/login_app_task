// данные для таблицы - в Store
const goodsStore = Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'description', 'price', 'quantity'],
    data: [
        { id: 1, name: 'Ноутбук', description: 'Игровой Ноутбук Lenovo', price: 129999.99, quantity: 5 },
        { id: 2, name: 'Мышь', description: 'Беспроводная Мышь Logitech', price: 2599.00, quantity: 0 },
        { id: 3, name: 'Клавиатура', description: 'Механическая Клавиатура Razer', price: 8799.00, quantity: 3 },
        { id: 4, name: 'Монитор', description: '4K Монитор Lenovo', price: 34000.00, quantity: 0 },
        { id: 5, name: 'Веб-камера', description: 'HD Веб-камера', price: 599.00, quantity: 7 }
    ]
});

Ext.define('LoginApp.view.goods.GoodsPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'goodspanel',
    controller: 'goods',
    layout: 'vbox',
    padding: 10,

    items: [
        {
            xtype: 'form',
            layout: 'hbox',
            defaults: {
                margin: '0 10 10 0',
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'ID',
                    itemId: 'filterId',
                    width: 100,
                    minValue: 0,
                    allowDecimals: false,
                    listeners: {
                        specialkey: 'onFilterSpecialKey'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Описание',
                    itemId: 'filterDescription',
                    width: 200,
                    listeners: {
                        specialkey: 'onFilterSpecialKey'
                    }
                },
                // {
                //     xtype: 'button',
                //     text: 'Применить фильтр',
                //     handler: 'onFilterClick'
                // },
                {
                    xtype: 'button',
                    text: 'Очистить фильтры',
                    handler: 'onClearFiltersClick',
                    margin: '30 0 10 0',
                    height: 32
                }
            ]
        },
        {
            xtype: 'grid',
            flex: 1,
            width: '100%',
            itemId: 'goodsGrid',
            disableSelection: true,
            store: goodsStore,

            viewConfig: {
                listeners: {
                    cellclick: 'onGridCellClick'
                }
            },

            columns: [
                { text: 'ID', dataIndex: 'id', width: 60 },
                {
                    text: 'Имя',
                    dataIndex: 'name',
                    flex: 1,
                    renderer: function (value, meta) {
                        meta.tdCls = 'clickable-cell';
                        return value;
                    }
                },
                { text: 'Описание', dataIndex: 'description', flex: 2 },
                { text: 'Цена', dataIndex: 'price', width: 100, xtype: 'numbercolumn', format: '0.00' },
                {
                    text: 'Кол-во',
                    dataIndex: 'quantity',
                    width: 100,
                    
                    // подсветить красным, если количество = 0
                    renderer: function (value, metaData) {
                        if (value === 0) {
                            metaData.style = 'background-color:rgb(253, 217, 217);';
                        }
                        return value;
                    }
                }
            ]
        }
    ]
});
