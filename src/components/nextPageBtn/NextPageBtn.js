import { texts } from "../../static/texts/texts";

export const NextPageBtn = ({disabled, onClick}) => {
    return (
        <button className={'page-btn' + (disabled ? ' m-disabled' : '') } id="NextPageBtn" onClick={onClick}>
            <p>{texts.misc.nextPageBtnSign}</p>
        </button>
    );
}