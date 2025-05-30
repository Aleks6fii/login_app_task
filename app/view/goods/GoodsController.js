Ext.define('LoginApp.view.goods.GoodsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.goods',

    onFilterClick: function () {
        const view = this.getView();
        const id = view.down('#filterId').getValue();
        const desc = view.down('#filterDescription').getValue()?.toLowerCase();
        const store = view.down('#goodsGrid').getStore();

        store.clearFilter();

        // фильтр по ID: точное совпадение
        if (id != null) {
            store.addFilter({
                property: 'id',
                value: id,
                exactMatch: true
            });
        }

        // фильтр по описанию: часть строки
        if (desc) {
            store.addFilter({
                filterFn: function(record) {
                    return record.get('description').toLowerCase().includes(desc);
                }
            });
        }
    },

    onClearFiltersClick: function () {
        const view = this.getView();
        view.down('#filterId').reset();
        view.down('#filterDescription').reset();
        view.down('#goodsGrid').getStore().clearFilter();
    },

    onFilterSpecialKey: function(field, e) {
        if (e.getKey() === Ext.EventObject.ENTER) {
            this.onFilterClick();
        }
    },

    onGridCellClick: function (view, td, cellIndex, record, tr, rowIndex, e) {
        const column = view.getHeaderCt().getHeaderAtIndex(cellIndex);
        if (column.dataIndex === 'name') {
            this.openGoodCard(record);
        }
    },

    // карта товара; используем Ext.form.Panel
    openGoodCard: function (record) {
        const form = Ext.create('Ext.form.Panel', {
            title: 'Данные о товаре',
            floating: true,
            closable: true,
            modal: true,
            centered: true,
            width: 350,
            bodyPadding: 10,
            layout: 'anchor',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'ID',
                    value: record.get('id')
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Имя',
                    value: record.get('name')
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Цена',
                    name: 'price',
                    value: record.get('price'),
                    minValue: 0,
                    allowDecimals: true
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Кол-во',
                    name: 'quantity',
                    value: record.get('quantity'),
                    minValue: 0,
                    allowDecimals: false
                }
            ],
            buttons: [
                {
                    text: 'Сохранить',
                    handler: function () {
                        const values = form.getValues();

                        const price = parseFloat(values.price);
                        const quantity = parseInt(values.quantity);

                        // проверка на неправильные значения 
                        if (isNaN(price) || price < 0) {
                            Ext.Msg.alert('Ошибка', 'Некорректные значения (цена)!');
                            return;
                        }
                        if(!Number.isInteger(quantity) || isNaN(quantity) || quantity < 0) {
                            Ext.Msg.alert('Ошибка', 'Некорректные значения (количество)!');
                            return;
                        }

                        const oldPrice = record.get('price');
                        const oldQuantity = record.get('quantity');

                            if (price === oldPrice && quantity === oldQuantity) {
                                form.close(); // закрыть форму без сообщения, если ничего не поменялось
                                return;
                            }

                            // если данные изменены, показать сообщение об этом
                            record.set('price', price);
                            record.set('quantity', quantity);
                            Ext.Msg.alert('Success', 'Информация о товаре обновлена!');
                            form.close();
                    }
                },
                {
                    text: 'Отмена',
                    handler: function () {
                        form.close();
                    }
                }
            ]
        });

        form.show();
    }
});
