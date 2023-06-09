import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from "styled-components"


const Karakterler = styled.div`
  width: 40vw;
  margin-left: auto;
  margin-right: auto;
  font-family: "Rubik Mono One", sans-serif;
  font-size: medium;
  cursor: pointer;
`;

const KarakterBilgisi = styled.div`
  border: 2px solid white;
  background-color: rgb(114 190 218 / 0.5);
  padding: 15px;
  border-radius: 10px;
  box-shadow: rgba(3, 138, 255, 0.4) 5px 5px, rgba(82, 78, 183, 0.3) 10px 10px,
    rgba(44, 130, 201, 0.2) 15px 15px, rgba(0, 0, 0, 0.2) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
`;

const Button = styled.div`
  width: 40vw;
  text-align: center;
  font-family: "Rubik Mono One", sans-serif;
  font-size: medium;
`;


const Karakter = () => {

  const [starWars, setStarWars] = useState([]);
  const [secilenKarakter, setSecilenKarakter] = useState(null);


  useEffect(() => {
    async function getApi() {
      try {
        const response = await axios.get("https://swapi.dev/api/people/");
        setStarWars(response.data);
        console.log("data tespit edildi:", response.data)
      } catch (error) {
        console.error("HATA BULUNDU:", error);
      }
    }
    getApi()
  }, []);

  const handleClick = (karakter) => {
    console.log(karakter);
    setSecilenKarakter(secilenKarakter == karakter ? null : karakter)
  }

  return (
    <Karakterler>
      {starWars ? (
        starWars.map((karakter) => (
          <KarakterBilgisi>
            <Button onClick={() => handleClick(karakter)}>
              {karakter.name}
            </Button>
            {secilenKarakter === karakter && (
              <div>
                <p>Boyu : {karakter.height}</p>
                <p>Ağırlığı : {karakter.mass}</p>
                <p>Saç Rengi : {karakter.hair_color}</p>
                <p>Ten Rengi :{karakter.skin_color}</p>
                <p>Göz Rengi :{karakter.eye_color}</p>
                <p>Doğduğu Yıl :{karakter.birth_year}</p>
                <p>Cinsiyeti :{karakter.gender}</p>
                <p>Vatanı :{karakter.homeworld}</p>
              </div>
            )}
          </KarakterBilgisi>
        ))
      ) : (
        <h3>Yükleniyor...</h3>
      )}
    </Karakterler>
  );
}

export default Karakter;