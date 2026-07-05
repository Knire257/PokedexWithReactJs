import { texts } from "../../static/texts/texts";

export const PreviousPageBtn = ({disabled, onClick}) => {
    return (
        <button className={'page-btn' + (disabled ? ' m-disabled' : '') } id="PreviousPageBtn" onClick={onClick}>
            <p>{texts.misc.previousPageBtnSign}</p>
        </button>
    );
}