import { Grid, GridItem, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { getUserData, ChangeAvatar, UpdatePassword } from '../services/API/user-service';
import { avatar } from '../utils/misc';
import "../styles/editprofile.scss";
import { useContext } from 'react';

import { Link } from 'react-router-dom';


const Editprofile = () => {
  const key = JSON.parse(localStorage.getItem("item"));
  const ref = useRef(null);
  const toast = useToast();
  const [data, setdata] = useState({
    username: "",
    image: "",
    email: "",
  })
  const [pass, setpass] = useState({
    password: "",
    confirmpassword: "",
  });
  const onChangePass = (val, event) => {
    setpass({
      ...pass, [val]: event.target.value
    })


  }

  const updatePassword = () => {

    UpdatePassword(key?.id, pass.password, pass.confirmpassword, "changepassword").then(response => {
      toast({
        title: response.status,
        duration: 4000,
        isClosable:"true",
        position:"top",
      })
    })


  }

  const onClickAvatar = (id) => {
    ChangeAvatar(key?.id, avatar[id].avatarUrl, "changeavatar").then(resdata => {
      setdata({ ...data, username: resdata?.username, image: resdata?.image, email: resdata?.email })
    })
  }
  useEffect(() => {
    getUserData(key?.id).then(resdata => {
      setdata({ ...data, username: resdata?.username, image: resdata?.image, email: resdata?.email })
    });

  }, [])



  return (
    <>
      <div class="wrapper">
        <div class="profile-card js-profile-card">
          <div class="profile-card__img">
            <img src={data.image} alt="profile card" />
          </div>

          <div class="profile-card__cnt js-profile-cnt">
            <div class="profile-card__txt">Front-end Developer</div>

            <div class="profile-card__name">
              <Grid
                // templateRows="repeat(2, 1fr)"
                templateColumns="repeat(12, 1fr)"
                gap={4}
              >
                <GridItem colSpan="6">
                  <Input placeholder="FirstName" defaultValue={data.username} />

                </GridItem>

                <GridItem colSpan="6">
                  <Input placeholder="LastName" defaultValue={data.email} />
                </GridItem>
                <GridItem colSpan="12" alignItems="start" textAlign="start" fon fontSize="md" height="auto">
                  Change Password
                </GridItem>
                <GridItem colSpan="6">
                  <Input placeholder="old Password" name="password" type="password" onChange={(e) => onChangePass("password", e)} />

                </GridItem>
                <GridItem colSpan="6" >
                  <Input placeholder="new password" name="confirmpassword" type="password" onChange={(e) => onChangePass("confirmpassword", e)} />

                </GridItem>
              </Grid>

            </div>

            <Text fontSize="xl" marginTop="10px" fontWeight="bold" color="var(--chakra-colors-gray-700)">
              Select Avatar
            </Text>

            <div class="profile-card-social" ref={ref}>
              {
                avatar.map((data, index) => {
                  return <a class="profile-card-social__item " key={index} onClick={() => { onClickAvatar(index) }}>

                    <img src={data.avatarUrl} alt="icons" />

                  </a>
                })
              }
            </div>

            <div class="profile-card-ctr">
              <button class="profile-card__button button--blue js-message-btn" onClick={updatePassword}>Edit</button>
              <Link to={"/chat"}>
                <button class="profile-card__button button--orange">Cancel</button>
              </Link>

            </div>
          </div>

          <div class="profile-card-message js-message">
            <form class="profile-card-form">
              <div class="profile-card-form__container">
                <textarea placeholder="Say something..."></textarea>
              </div>

              <div class="profile-card-form__bottom">
                <button class="profile-card__button button--blue js-message-close">
                  Send
                </button>

                <button class="profile-card__button button--gray js-message-close">
                  Cancel
                </button>
              </div>
            </form>

            <div class="profile-card__overlay js-message-close"></div>
          </div>

        </div>

      </div>
    </>
  );
}

export default Editprofile;

