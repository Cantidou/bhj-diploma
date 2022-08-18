/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    //this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {

    if (User.current()) {
      const accountList = this.element.querySelector(".accounts-select");
      Account.list(User.current(), (error, response) => {
        if (response && response.success) {
          response.data.forEach(item => accountList.innerHTML += `<option value="${item.id}">${item.name}</option>`);
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if (resp && resp.success) {
        this.element.reset();
        if (this.element.getAttribute('id') == 'new-income-form') {
          App.getModal('newIncome').close()
        } else {
          App.getModal('newExpense').close()
        }
        App.update();
      }
    })
  }
}
