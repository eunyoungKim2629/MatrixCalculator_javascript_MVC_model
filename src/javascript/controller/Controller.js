import Constants from '../model/Constants.js';
import { $, $$ } from '../utils/ElementTool.js';
import CalcMatrixContainer from '../view/CalcMatrixContainer.js';
import Modal from '../view/Modal.js';
import NormalMatrixContainer from '../view/NormalMatrixContainer.js';

export default Object.freeze({
	normalFirstMatrixContainer: new NormalMatrixContainer('First Matrix'),
	normalSecondMatrixContainer: new NormalMatrixContainer('Second Matrix'),
	GENERAL_MATRIX: Constants.GENERAL_MATRIX,
	CALC_MATRIX: Constants.CALC_MATRIX,
	WARNING_KEYWORD: Constants.WARNING_KEYWORD,
	init() {
		$('#app').append(this.normalFirstMatrixContainer.printNormalMatrixContainer(), this.normalSecondMatrixContainer.printNormalMatrixContainer(), CalcMatrixContainer.printCalcMatrixContainer());
		this.printMatrix();
	},
	printMatrix() {
		$$('.buttonCreateNormalMatrix').forEach((button, index) => {
			button.addEventListener('click', () => {
				this.confirmNumber($$('.inputNormalMatrixRow')[index].value, $$('.inputNormalMatrixCol')[index].value);
			});
		});
	},
	confirmNumber(firstArg, secondArg) {
		if (/^[1-9]+$/.test(firstArg) && /^[1-9]+$/.test(secondArg)) {
			console.log(firstArg, secondArg);
			return;
		} else if (!/^[1-9]+$/.test(firstArg)) {
			console.log('false');
		} else if (!/^[1-9]+$/.test(secondArg)) {
			console.log('false');
		}
    Modal.printModal(Constants.WANING_KEYWORD.WARNING01);
	},
  deleteModal() {
    $('.buttonDeleteModalContainer').addEventListener('click', () => {
      Modal.removeModal();
    })
  }
});
