import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import bodyImageUrl from '../Home/images/body.jpeg';
import foodsImageUrl from '../Home/images/foods.jpeg';
import natureImageUrl from '../Home/images/nature-care.jpeg';

import './Home.css';

const Home = () => {
    return (
        <div className='main'>
            <Card className='home-card'>
                <Card.Img variant="top" src={bodyImageUrl} />
                <Card.Body className='home-card-body'>
                    <Card.Title className='home-card-title'>Body Care</Card.Title>
                    <article className='home-card-cardbody-cardtext'>
                        <p>Home-based care is well positioned to drive progress toward key U.S. health care system–wide goals. As discussed, many patients prefer to receive care in the home, so the use of high-quality home-based care could support the goal of patient-centered care.</p>
                        <p>Home health care is also a relatively low-cost setting of care. As the health care system grapples with high costs and expenditures, home health’s efficiency could support the goal of high-quality, low-cost care. All told, the discussion about patients’ preferences and the appropriateness of care speaks more broadly to the clinical imperative of addressing each patient’s full range of needs, which may go beyond Medicare home health benefits. These long-term care needs, which include functional capacity, care transitions, care coordination, and support for caregivers, are not strictly medical.</p> 
                        <p>However, they have been shown to have meaningful impacts on patients’ ability to maintain their health and remain in the community. Stakeholders, including MedPAC, have expressed concern that the increase in community-referred (or “Part B”) home health episodes may be indicative of Medicare home health being used as long-term care.32 The United States faces an unmet long-term care need due to a relatively weak and fragmented benefit system. Some home health agencies have separate lines of business that currently provide long-term care services through Medicaid and private duty and so are important to the broader long-term care discussion.</p>
                    </article>
                    <Button className='home-card-button' variant="primary"><Link className='home-card-button-link' to={'/body'}>Body</Link></Button>
                </Card.Body>
            </Card>

            <Card className='home-card'>
                <Card.Img variant="top" src={foodsImageUrl} />
                <Card.Body className='home-card-body'>
                    <Card.Title className='home-card-title'>Bio Foods</Card.Title>
                    <article className='home-card-cardbody-cardtext'>
                        <p>Vitamins, minerals and other supplements are important for the human body and deficiencies of these nutrients can result in serious health problems.</p>
                        <p>Therefore it is recommended that each person should eat at least five fruits and vegetables per day. The problem is that in many cases eating more fruits and vegetables means consuming more acids and toxins in our body.</p> 
                        <p>The intake of processed foods with chemicals, pesticides, processed fertilisers only aggravate people’s health. Especially pregnant women are not advised to consume those foods with lots of chemicals as this may affect the baby. The biggest advantage of bio products is that it does not contain preservatives, chemical additives and toxins. Compared to other products, organic food is not genetically modified, meaning there are no changes from its natural state and therefore no chemicals are ingested into our bodies. Bio foods are said to taste better compared to processed food and also have better nutritional value. Most people who have tried them do not return back to eating mass produced, commercial foods again.</p>
                    </article>
                    <Button className='home-card-button' variant="primary"><Link className='home-card-button-link' to={'/foods'}>Foods</Link></Button>
                </Card.Body>
            </Card>

            <Card className='home-card'>
                <Card.Img variant="top" src={natureImageUrl} />
                <Card.Body className='home-card-body'>
                    <Card.Title className='home-card-title'>Nature Care</Card.Title>
                    <article className='home-card-cardbody-cardtext'>
                        <p>Nature is essential to our lives – from the food on our plates to the clothes we wear, from medicines to mental health benefits.</p>
                        
                        <p>It’s easy to think nature will always be with us. But even in my lifetime, birds like starlings and house sparrows have declined so much they’re now listed as endangered.
                        In fact, nature is faring worse in the UK than in most other countries. The latest State of Nature report shows that over half our wild species – plants, insects, birds, mammals – are in decline.
                        Children especially have a natural affinity with nature.</p> 

                        <p>Evidence is growing of how regular contact with nature boosts new born children’s healthy development, supports their physical and mental health and instils abilities to assess risk as they grow. It even underpins their informal learning and academic achievement.</p>
                        
                        <p>Nature performs major miracles for us every day – from giving us great views and helping to prevent floods to regulating the weather and keeping us supplied with clean water, fresh air and plentiful food. When running the tap or doing the shopping it’s easy to forget that without healthy soils and diverse plant and animal species doing their thing our lives would be tougher and poorer.</p>
                    </article>
                    <Button className='home-card-button' variant="primary"><Link className='home-card-button-link' to={'/nature'}>Nature</Link></Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Home;