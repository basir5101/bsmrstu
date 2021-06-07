import React from 'react';
import bannerImage from '../../images/banner.jpg';
import './Banner.css';

export default function Banner() {
    return (
        <div className = ''>
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <img src={bannerImage} className = 'w-100' alt="" />
                    </div>
                </div>
                <div className="col-md-6 signup text-white welcome-text">
                    <div className="text-center">
                        <h3>Welcome to Deparment Of Physics</h3>
                        <br />
                        <h6>- Bangababandhu Sheikh Mujibur Rahman Science And Technology University, Gopalganj-8100</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
