import {noCurrent, noCurrentTitle, dropDashedBox} from './styles/NoCurrent.css'

export default function noCurrentView() {
    return (
        <div className={noCurrent}>
            <div className={dropDashedBox}>
                <h1 className={noCurrentTitle}>There is still nothing here !</h1>
                <h2 className={noCurrentTitle}>Drop your CSV here or use the menu!</h2>
            </div>
        </div>
    )
}