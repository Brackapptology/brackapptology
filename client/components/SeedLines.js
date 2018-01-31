import React from 'react';

export default function SeedLines(props) {
    return props.seedLines.map((line, idx) => {
        return (
            <div key={idx}>
                <h5>No. {idx + 1} seeds</h5>
                <div className="new-bracket-seed-line">
                    {
                        line.map(team => {
                            return (
                                <p key={team} className="new-bracket-team">{team}</p>
                            )
                        })
                    }
                </div>
            </div>
        )
    })
}