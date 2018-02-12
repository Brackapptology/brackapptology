import React from 'react';
import createSeedlines from '../../utils/createSeedlines';
import formatDate from '../../utils/formatDate';
import SeedLines from './SeedLines';
import BracketSidebar from './BracketSidebar';
import ShareButtons from './ShareButtons';

export default function UserBracket(props) {

    if (props.field && props.lastFour) {

        const seedLines = createSeedlines(props.field, props.lastFour);
        return (
            <div className="user-bracket">
                <div className="user-page-bracket-field">
                    <h3>{formatDate(props.date)}</h3>
                    <ShareButtons
                        url={`https://brackapptology.herokuapp.com${props.url}`}
                        title={`${props.name}'s newest bracketology`}
                        quote={`${props.name}'s newest bracketology via Brackapptology`}
                        />
                    <SeedLines seedLines={seedLines} />
                </div>
                <BracketSidebar sideType={'user-page-bracket-sidebar'} field={props.field} lastFour={props.lastFour} />
            </div>
        )
    } else {
        return null;
    }
}