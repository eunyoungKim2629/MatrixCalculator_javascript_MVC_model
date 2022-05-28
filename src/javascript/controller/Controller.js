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
				this.confirmNumber($$('.inputNormalMatrixRow')[index].value, $$('.inputNormalMatrixCol')[index].value, index);
			});
		});
	},
	resetInputRowAndCol(index) {
		$$('.inputNormalMatrixRow')[index].value = '';
		$$('.inputNormalMatrixCol')[index].value = '';
	},
	setResOnly(index) {
		$$('.inputNormalMatrixRow')[index].setAttribute('redeOnly', 'redeOnly');
		$$('.inputNormalMatrixCol')[index].setAttribute('redeOnly', 'redeOnly');
	},
	setNotReadOnly(index) {
		$$('.inputNormalMatrixRow')[index].removeAttribute('readOnly');
		$$('.inputNormalMatrixCol')[index].removeAttribute('readOnly');
	},
	resetNormalMatrixContainer(index) {
		NormalMatrixContainer.resetInputMatrixItems(index);
		switch (index) {
			case 0:
				this.normalFirstMatrixContainer.toggleButtons(index);
				break;
			default:
				this.normalSecondMatrixContainer.toggleButtons(index);
				break;
		}
	},
	confirmNumber(rowValue, colValue, index) {
		if (/^[1-9]+$/.test(rowValue) && /^[1-9]+$/.test(colValue)) {
			this.resetNormalMatrixContainer(index);
			NormalMatrixContainer.printInputMatrixItems(NormalMatrixContainer.createInputMatrixItems(parseInt(rowValue), parseInt(colValue)), index);
			this.setResOnly(index);
			return;
		} else if (rowValue === '' || colValue === '') {
			this.resetInputRowAndCol(index);
			Modal.printModal(`${Constants.WARNING_KEYWORD.WARNING01}${Constants.WARNING_KEYWORD.WARNING02}`);
			return;
		} else if (!/^[1-9]+$/.test(rowValue) || !/^[1-9]+$/.test(colValue)) {
			this.resetInputRowAndCol(index);
			Modal.printModal(Constants.WARNING_KEYWORD.WARNING02);
			return;
		}
	},
	deleteModal() {
		$('.buttonDeleteModalContainer').addEventListener('click', () => {
			Modal.removeModal();
		});
	},
});
