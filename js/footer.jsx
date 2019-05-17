import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer center">
                <div className="info">
                    <p className="hol">created by <a href='https://github.com/HolAnia/fun-with-drinks' target="_blank">HolAnia</a> </p>
                    <div className="infoProhibitions">
                        <div>
                            <p><span>Sources:</span></p>
                            <div className="info">
                                <p>
                                    <a href="https://pl.pngtree.com/freebackground/fantasy-brick-wall-background-light-effect_601241.html">pngtree.com</a>
                                </p>
                                {this.props.info}
                            </div>
                        </div>
                        <div className='prohibitions'>
                            <div className="prohibition">18</div>
                            <div className="prohibition">DON'T DRINK &amp; DRIVE</div>
                            <div className="prohibition">PREGNANT? DON'T DRINK</div>
                        </div>
                    </div>
                </div>
                {/* <div className="logo"><h3>Fun with drinks</h3></div> */}
            </div>
        )
    }
}