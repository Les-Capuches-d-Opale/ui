import { Avatar, Button } from 'react-rainbow-components';

//Styles
const avatarLarge = { 
    width: 150, 
    height: 150 
}
const headerStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '50px'
}
const headerRightStyles : React.CSSProperties = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '30px',
    maxWidth: '100%',
}
const headerTitle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}
const questDescriptionStyles = {
    height: '70px',
}
const principalInfos : React.CSSProperties = {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: '50px'
}
const info = {
    fontSize: '18px'
}
const titleAssign = {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
}
const buttonAssign = {
    height: '30px',
    fontSize: '12px',
    margin: 0,
    marginLeft: '30px'
}

const QuestDetails = () => {
    const isRequest = window.location.pathname.includes('/requests/') ? true : false

    return (
      <div style={{padding: '30px 50px'}}>
        <div style={headerStyles}>
            <Avatar
                style={avatarLarge}
                src="https://picsum.photos/150/150"
                assistiveText="Jane Doe"
                title="Jane Doe"
            />
            <div style={headerRightStyles}>
                <div style={headerTitle}>
                    <h1>Titre de la quête</h1>
                    <div className='status'>Status</div>
                </div>
                <p style={questDescriptionStyles}>Description de la quête...</p>
                <p style={{fontSize: '10px', color: 'grey'}}>Demande effectué par <strong style={{color: 'white'}}>[Nom du commenditaire]</strong></p>
            </div>
        </div>
        <div style={principalInfos}>
            <p style={info}><strong>Prime: </strong>1000</p>
            <p style={info}><strong>EXP: </strong>126</p>
            <p style={info}><strong>Durée: </strong>5j</p>
        </div>
        <div style={{marginBottom: '50px'}}>
            <div style={titleAssign}>
                <h3 style={{fontSize: '24px'}}>Aventurier Assignés</h3>
                <Button style={buttonAssign} label="Assigner" variant="border" className="rainbow-m-around_medium"/>
            </div>
            <div className="table"></div>
            <p><strong>Coût max. de la missions: </strong> 2500</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {isRequest && <Button label="Rejeter la mission" variant="destructive" className="rainbow-m-around_medium"/>}
            {isRequest && <Button label="Valider l'équipe" variant="success" className="rainbow-m-around_medium"/>}
            {!isRequest && <Button label="Lancer la mission" variant="success" className="rainbow-m-around_medium"/>}
        </div>
      </div>
    );
  };
  
  export default QuestDetails;
  