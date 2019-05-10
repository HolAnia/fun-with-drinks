// Icon made by monkik from www.flaticon.com 
{/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */ }




// Obraz <a href="https://pixabay.com/pl/users/Alexas_Fotos-686414/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1651325"> Alexas_Fotos</a> z <a href="https://pixabay.com/pl/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1651325"> Pixabay</a>

import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer center">
                <div className="info">
                    <p className="hol">created by <a href='https://github.com/HolAnia/fun-with-drinks' target="_blank">HolAnia</a> </p>
                    <p><span>Sources:</span></p>
                    <p>
                        <a href="https://pl.pngtree.com/freebackground/fantasy-brick-wall-background-light-effect_601241.html">pngtree.com</a>
                    </p>
                    {this.props.info}


                </div>
                {/* <div className="logo"><h3>Fun with drinks</h3></div> */}
            </div>
        )
    }
}