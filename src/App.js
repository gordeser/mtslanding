import './App.css';
import React, {useState} from "react";
import Slider from '@mui/material/Slider'
import {withStyles} from '@mui/styles';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel, IconButton,
    TextField, Typography,
    useMediaQuery, useTheme
} from "@mui/material";


function App() {

    const marks = [
        {
            value: 0,
            label: '500 Мбит/c',
        },
        {
            value: 100,
            label: '1 Гбит/c'
        }
    ]
    const StyledSlider = withStyles({
        root: {
            color: 'gray', // Цвет слайдера по умолчанию
            height: 8, // Высота слайдера
            '&:hover $thumb': {
                backgroundColor: 'red', // Цвет слайдера при наведении мышкой
                boxShadow: 'none', // Убираем тень при фокусе и наведении на "бегунок" слайдера
            },
            borderRadius: '50%',
            boxShadow: 'none', // Убираем тень при фокусе и наведении на "бегунок" слайдера
        },
        thumb: {
            height: '100%', // Высота "бегунка" слайдера
            width: '100%', // Ширина "бегунка" слайдера
            backgroundColor: 'red', // Цвет "бегунка" слайдера
            // marginTop: -8, // Смещение "бегунка" слайдера по вертикали
            // marginLeft: -12, // Смещение "бегунка" слайдера по горизонтали
            color: 'white',
            borderRadius: '100%',
            boxShadow: 'none',
            '&:focus, &:hover, &$active': {
                boxShadow: 'none', // Убираем тень при фокусе и наведении на "бегунок" слайдера
            },
            '&:hover': {
                boxShadow: 'none', // Убираем тень у бегунка слайдера при наведении
            },
        },
        active: {
            boxShadow: 'none',
            backgroundColor: 'red'
        },
        valueLabel: {
            // left: 'calc(-50% + 4px)', // Смещаем подпись значения слайдера
            backgroundColor: 'red'
        },
        track: {
            // height: 8, // Высота бэкграунда слайдера
            // borderRadius: 4, // Радиус закругления углов бэкграунда слайдера
            backgroundColor: 'red',
            color: "#FF0032"
        },
        rail: {
            height: 8, // Высота бэкграунда слайдера
            borderRadius: 4, // Радиус закругления углов бэкграунда слайдера
            color: 'gray', // Цвет бэкграунда слайдера
            // background: "#FF0032",
            // color: "#FF0032"
        },
        markLabel: {
            fontFamily: 'MTSCompact, sans-serif',
            fontSize: '50px',
        }
    })(Slider);


    // sliderValue
    const [sliderValue, setSliderValue] = useState(0);
    const handleChangeSlider = (event, newValue) => {
        setSliderValue(newValue);
    };

    const CustomButton = withStyles({
        root: {
            background: "#FF0032",
            fontFamily: "MTSCompact, sans-serif",
            color: "#FFFFFF",
            border: "1px solid",
            textAlign: "center",
            fontWeight: 500
        }
    })(Button);

    const [tariffName, setTariffName] = useState('МТС Новогодний+')

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setPhoneNumberError(false);
        setNameError(false);
        setCheckError(false);
        setChecked(false);
    }

    const [phoneNumber, setPhoneNumber] = useState('+7')
    const [name, setName] = useState('')
    const [checked, setChecked] = useState(false)

    const handleChangeCheckbox = (e) => {
        setChecked(e.target.checked)
    }

    const handleChangePhoneNumber = (e) => {
        let value = e.target.value;
        if (!value.startsWith('+7')) {
            value = '+7'
        }

        const test = isNaN(parseInt(value.slice(-1)))

        if (!test && value.length <= 12) {
            setPhoneNumber(value)
        }
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [checkError, setCheckError] = useState(false);

    const handleSubmitForm = () => {
        if (phoneNumber.length !== 12  || !phoneNumber.startsWith('+79')) {
            setPhoneNumberError(true);
        } else {
            setPhoneNumberError(false);
        }

        if (name.length === 0) {
            setNameError(true);
        } else {
            setNameError(false);
        }

        if (!checked) {
            setCheckError(true);
        } else {
            setCheckError(false);
        }

        if (phoneNumber.length === 12 && name.length !== 0 && checked) {
            let speed = sliderValue === 0 ? '500 Мбит/c' : '1 Гбит/с'

            fetch('http://localhost:5000/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, phoneNumber, tariffName, speed})
            }).catch(err => {
                console.log('Error:', err)
            })

            setPhoneNumber('+7');
            setName('');
            setChecked(false);
            setOpenDialog(false);
        }
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))



  return (
    <div className="App">
        <div className="container">
            <div className="image">

                <div className="white-rectangle">

                    <div className="inside-content">
                    {/*    <div className="badge-container">*/}
                            <div className="badge">
                                Первый месяц — бесплатно
                            </div>

                            <div className="title">
                                {tariffName}
                            </div>

                        {/*</div>*/}
                        <div className="short-description">
                            Сказочно выгодный тариф с мобильной связью, домашним интернетом и ТВ, онлайн-кинотеатром KION
                        </div>

                        <div className="params">
                            <div className="gigabytes">
                                <img src="//static.mts.ru/dpc_upload/contents/354/sim_card_new_year.svg" className="sim-card" />
                                30 ГБ
                            </div>

                            <div className="minutes">
                                <img src="//static.mts.ru/dpc_upload/contents/354/call_new_year.svg" className="phone" />
                                500 минут
                            </div>

                            <div className="channels">
                                <img src="//static.mts.ru/dpc_upload/contents/354/tv_new_year.svg" className="tv" />
                                200+ ТВ-каналов
                            </div>

                            <div className="speed" style={{marginTop: "5px"}}>
                                <img src="//static.mts.ru/mts_rf/images/content/cards/icon_card_wifi.svg" className="wifi" />
                                { sliderValue === 0 ? '500 Мбит/c' : '1 Гбит/с'}
                            </div>

                            <div style={{marginLeft: "20px", marginTop: "5px", fontFamily: "MTSCompact", maxWidth: "85%"}}>
                            <StyledSlider
                                value={sliderValue}
                                onChange={handleChangeSlider}
                                step={null} // Шаг слайдера (null - только 2 значения)
                                aria-labelledby="discrete-slider"
                                marks={marks}
                            />
                            </div>
                        </div>


                        <div className="price-container">
                            <div className="price">
                                <div className="price-value" style={{marginTop: "5px", marginLeft: "2px"}}>{sliderValue === 0 ? 390 : 630 }</div>
                                <div className="price-measure">₽/мес</div>
                                <div className="old-price" style={{marginLeft: "20px"}}>{sliderValue === 0 ? 750 : 990 } ₽</div>
                            </div>
                        </div>

                        <span className="price-description">
                                Стоимость по акции первые 12 месяцев, с 13 месяца — {sliderValue === 0 ? 750 : 990 } ₽/мес
                            </span>


                        <div className="connect-button" style={{marginTop: "28px", marginLeft: "20px", marginBottom: "5px"}}>
                            <CustomButton variant="contained" onClick={handleOpenDialog}>Подключить</CustomButton>

                            <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                aria-labelledby="form-dialog-title"
                                fullScreen={fullScreen}
                            >
                                <DialogTitle id="form-dialog-title" sx={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
                                    Заявка на подключение
                                    <IconButton onClick={handleCloseDialog}>
                                        <img src="//static.mts.ru/mts_rf/images/icons/modal-close-icon.svg" alt="Close icon"/>
                                    </IconButton>

                                    <div className="form-description">
                                        Оставьте контактные данные, и мы с вами свяжемся
                                    </div>
                                </DialogTitle>

                                <DialogContent>
                                    <div className="phoneAndName">
                                        {phoneNumberError ? (
                                            <TextField
                                                error
                                                margin="dense"
                                                id="phoneInput"
                                                name="phoneNumber"
                                                label="Номер"
                                                type="text"
                                                value={phoneNumber}
                                                helperText="Вы ввели неправильный номер телефона"
                                                onChange={handleChangePhoneNumber}
                                            />
                                        ) : (
                                            <TextField
                                                margin="dense"
                                                id="phoneInput"
                                                name="phoneNumber"
                                                label="Номер"
                                                type="text"
                                                value={phoneNumber}
                                                onChange={handleChangePhoneNumber}
                                            />
                                        )}

                                        {nameError ? (
                                            <TextField
                                                error
                                                margin="dense"
                                                id="nameInput"
                                                name="name"
                                                label="Имя"
                                                type="text"
                                                value={name}
                                                helperText="Введите имя"
                                                onChange={handleChangeName}
                                            />
                                        ) : (
                                            <TextField
                                                margin="dense"
                                                id="nameInput"
                                                name="name"
                                                label="Имя"
                                                type="text"
                                                value={name}
                                                onChange={handleChangeName}
                                            />
                                        )}


                                    </div>

                                    <FormControlLabel id="someId"
                                        control={
                                        <Checkbox
                                            id="oneMoreId"
                                            size="ownsize"
                                            checked={checked}
                                            onChange={handleChangeCheckbox}
                                            icon={<img src="//static.mts.ru/mts_rf/images/icons/checkbox-empty.svg" alt="Checkbox empty"/>}
                                            checkedIcon={<img src="//static.mts.ru/mts_rf/images/icons/checkbox-checked.svg" alt="Checkbox checked"/>}
                                        />}
                                        label={
                                            <Typography sx={checkError ? {color: "#d32f2f"} : {}}>
                                                Я даю <a href="https://static.mts.ru/mts_rf/images/homeservices/soglasie-pdn-zayavka.pdf" target="_blank">согласие</a> на обработку своих персональных данных
                                            </Typography>
                                        }
                                    />

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleSubmitForm} size="small">
                                        Оставить заявку
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

      // <div className="App">
      //
      //     <div className="tariff-page">
      //         <div className="banner-block banner-block-full-screen">
      //             <div className="banner-background-wrapper banner-background-wrapper_full-screen">
      //                 <div className="product-header__banner-picture">
      //                   <div className="picture">
      //                       <img src="//static.mts.ru/dpc_upload/contents/614/mts_novogodnij_3840_1894.avif"/>
      //                   </div>
      //                 </div>
      //             </div>
      //
      //             <div className="banner-details-button">
      //               Подробнее
      //             </div>
      //         </div>
      //     </div>
      //
      // </div>
  );
}

export default App;
