import React, { useState } from "react";
import "./Register.css";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { MdOutlinePerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../actions/AuthActions";
import axios from "axios";

const Register = () => {
  const initialState = {
    email: "",
    username: "",
    password: "",
    image:"",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const [image,setimage]=useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    // try {
    //   const res = await axios.post("http://localhost:5000/auth/register", data);
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    dispatch(signUp(data, navigate));
  };
  function convertFile(event) {
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setimage(dataURL);


    };
    reader.readAsDataURL(event.target.files[0]);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prevData) => ({ ...prevData, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="chatvia-registeration">
          <div className="chatvia-logo">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjoAAACMCAYAAAB1RAOBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5OTgwODgxM0NDMTQxMUVBQjcxMDhCNzAwNkIxQkJGOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5OTgwODgxNENDMTQxMUVBQjcxMDhCNzAwNkIxQkJGOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk5ODA4ODExQ0MxNDExRUFCNzEwOEI3MDA2QjFCQkY4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk5ODA4ODEyQ0MxNDExRUFCNzEwOEI3MDA2QjFCQkY4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KDf3VwAAGsJJREFUeNrsnX2MHsV9x3+z+5xNYgoHMY1pm/A4FVD+SDlXtGllRX58SYSuSeVzU9RX8OOqpS+psS9IIWqV3nOiUhGNemdQIxFVuedKG4WIyncolUOa+h43OGnVVj6rVYJNwQ8C4lJKfIAJ2He705m7Wfz4/Nzdszszu7O73w8aP8fdsy/zm9/MfOedcc4JAAAAAKCIMAgdAAAAAEDoAAAAAABA6AAAAAAAQOgAAAAAAEDoAAAAAABA6AAAAAAAQOgAAAAAAEIHAAAAAABCBwAAAAAAQgcAAAAAAEIHAAAAAABCBwAAAAAAQgcAAAAAEDoAAAAAABA6AAAAAAAQOgAAAAAAEDoAAAAAABA6AAAAAAAQOgAAAACA0DHIPff0/t2NC+eIhQFxP6SAGJHPySePFi8s0A9pM13pnyXuMfIZozDgxJn4+7svUPjmBvJ8j8KQU7AofldhxBZ98d2AxOW0fLcKkYhbhS1QwDcQF78V36Lznv+ejXzhZgq9nxKxv0mY4GYRtojvbhJ/3iRe6xoRNqlXfFME8RLikzER+BnxvVPiRU6RFz59nvWd3BgGry4ZUr6/J94xFI8VP3vBooiXL39LFPgU+oviFuLvXLy3iKXPAloQ8e4LPPrLL/TTvZ+aF9cymSJ01Sv9dPbqN2mDH1DAwqV4c88j+Z/P36ZNr1zXs41HvwonBwAAUF4qJYjjFhE+LMJHRfiYECZbl9QQW5Yny/CLP17KhiXhw9R3uLpG/r8QLBt5IH9xRoSnRPimCE+K8DzcCgAAAIDQscktItwlwicD3nfjch8Ls/Ws60W4gxO/g8Kl/z8lwuMiPCrC03AxAAAAIDu8AsVlswhy4OzfPO5/l3H+WSFtbszgPW5ixP+Y+/73xM//KsI+9W4AAAAAgNCJzftFOMj94HlidJA43ebQu/0cJ3pIvNuL4udHRHgfXA4AAACA0OmFrVLg+D6dFOJG9uS82+F33ciI3U3ce1b8/Dci3AzXAwAAACB0uiFXRD0QBnL1kxQ47IocvXsfI7rTp+C/pEgT4Sq4IAAAAAChE/FLwbmNTwtxcx/leyJ1RYq0vkVPTlaWk6YZXBEAAAAor9CRw1RHGGdPMEY/USD7Xy8Ez9Snf3/+H8XPN8AdAQAAgPIJnV1hwP9DfO4sbCow+ggP6YT46Q64JAAAAFAOodMnwgMspEO0vFtx0bmaiD9Gy3N3NsA1AQAAAH1cnedy/ZWV+SeIs9tKlh5Mzt15bfPZD9HChl3i/1+Gi67N9sEhGOEiswmumRKhCdMBANLm2JHDpRU6W5lfeVJU+DeWNfEZsQ/5fQvfodC7XfzvM8gO1qiJUKWL86Nqa3y3pT7lEGNbhDlH4xOXFtwAAFBkXBM6HwwD/nVG9GNIGtoa+OG3KCTZZXEc5tCmX4RhEXaIMKCCroiQImFGfc7BxAAAVVbsSHDdGExXfKGzgwXsCcLeMhfh9F5iS5XoJ0T4FgySiLoIu5TIsVGgRQKoTcvzq5oizMPsAJQWKXIaEDru4Mpk5J9mRNMQOV25ihH7mvj8GZiiZ2TvzagIZ0WYtCRyVlIVYVyE0+qZVSQDAABA6Eh+MiTvSVU5gVXEjhfyr4vPm2CKdRlVYqORkU/JZ9ZpebhxFH4NAADlFjo/uujzw0R8C5JiXa6jMJBT1GGr7tQyFjjdBE9DCZ4akgcAAMondDaG3uI/MCrv6qoEfGCRV+QQH/bZuRTZcyKXVlcdfLeqerdRJBMAAKSP8cnIDz+89t/3332WfCmvGPsL8e9tSIJ4yKXnr2+e/3MhEO9lfi9HZF1dWFtsHxySvSZyQ8laDl63od5zN2GyMkiPGvW2v1KLirz7PCg1WfXoyFVEf+SUfugtuMIIpTPB1nWRM0v5GhaKKh3M2wFpsQMmABA66fN+YmyKcGK3ljDjRF+i5cNOyyxyBnL4+gMQOyBlfwMAQifNCtr3WVN8XgvTa3MND/gXw5DIvxCuGiByIHYAhA4AZcb4HJ19+36w6t82LLDf4MQwDmwITvRR8fGrIjxWomjbFDltFTrpt/Q8eU85vwj5AdhC+m4VZgAQOulxFWfsQZjcuNqZEP/KPXZeK3pUtw8OjRsWHfLYhin12epBmMhgcpflGi2vxsKOqMAG6M0BgCwMXV1xodI19C16f0Y4w8qG0tlywWOjoUjKbqFAIkeKiwOGbtek5flN20SYoN4OtpxT1+1W1zYNvUuDsM8OsAMmIgNA6fXoyL1y/hDmtgNjtE98/JUIzxYxfmpezqSBW0lBs5cuH56KS1vd56B6L92W8ySVdGI5sAp6dLJB9hIfhRkKLHQCf7HLb73PEicf5raXjoEX3sd8dndB42fiKIUGmR8ikr08co6NHFKra9ynShjCAhA6RaFtoDEFDJLG2Mb7hMj5LZjaMozJivaGokVr++CQLKx1h6z2WhQR8+r+Tc37HCCswgLmwERkAGwJnQV/wyWBuHcf4ciCNOjjnD79NvnUGQrAuOb1DTI3n2Y9MaXzHFkx7YcbA0OgNwcAW0JnBdeJ8Nswc0pw+l3x73uKEp3tg0M10puo26J0h4PkjtVzGtcfgBMDQ2AiMgC2hE7fwmJn+HXxq3fBzKnxro3h4q+JQFHIOXs0ro2GlNJkXomdpMhenTrcGBgAPToA2BI6oRe8E8Td74SJ04UT3RlQhaKQV7YPDlU1K325bLydwau3SG8Iaxe8GEDoAOCw0OngFlHr4nTylJGnm4uPmwsQFZ1N+WTPysEM330so3gDIMFEZABsCh1GlSjcBfNmg8+C3xRBfuY5GjoTcyeU2MmKtgjTEDsgI9CbA0AH5sc2onkhzP+kxffu9eRznpFds30/zn6F88U/zatTqiXlOi3SKQeiMaUhWG7VFEq2ewui9Om2ncFRJTLncuRyUZx2qM/+js/1aHV8Pq8+2xnHBxORQRyqyt9v7fD7Wg/XRfk8+jyhPtuuRdDWJI4fZ8u7IYNM4LfINBDhpZxGoKZx7bQjGW1aFQD9CeM/5lh67FGfcQSorPRnHEqTlYX7sIrXgAFf7fTZtor7FPV2vEicZ81aTOO4Da+da8RP+v3ZmPeTPbEjKab/aUvvlzSdWIr+P6B8f1ijUdkpiIZX+P80XTxHMHPMD115vgwfgdjIOmG9mpffs650JuTOOBSPpJWcK0MPdVUZzKqf4xaIshAcX3GPrBlW73JavZsNW1dVXKPn1Kl8zFP8XsnhlP0gLlMFSJcoTx+n5e0sqpb8/4B6xiw5cJaf+ZowXAo7ITWyhTO2U4S8vr5Oxmg5FI+k5930O2B/WUhNGiwIa+p+xzMq+KJW9qGUn19V8T5N5Tu8dSqBrdIS+XG3rpijfA3HdhN2pw3n6Tj5bpYynCBvvkcn9GUH3CCkRuYM8gv569FRmwQmxbXxYdnVzRKGrBhVhZKtCmdA3X88xTiNO9CyrKp3GC1RGRQN39oUIEnTIq5/57U3p1+J+0OU7Uq8qPFUL4TQEWwW4f3QGZkjT8O+NofvrTORcg7JroVs7TVSelbUtW2z96pfiQuXdpxuKDuXhWaCngfbDKcQDxcYUHnMlVWc/cr3Uxc7xoVO4C3eTMAJ2IbFm3KaOZNyAqmuJXLqGaT1rCWxE4mcmoO2rpdI7CQZvrJdMcftNUrSM+VCOZrpcJFLZY1n/oYMQscROHl5TAudjIkenWSMU3YTZmWBfMhSYeryfjJ1Ksd+SUmGk23uDl5N4BczObN5NFzV7/A7jqeZPy0MXXEIHUdg+RSdOs4PoRMfWdlmPbRTI7NzV0ZzIiImHa+MTHEwgU/a9Pc4yJ6cZs7snfaE46RiLLV5eub30WHsJgJOwHMmOrcPDukW+vNI9VSFpUkatDzM0da8T9WQcIs2QZvr4lcDdHHTRN3CXu4APlZwH5uOWan1K0FiY9PM/QnePU/UDAnFyP9bqzyj1w0113xXufjk2JHDrfwJHWJbstuQGFySEkTvLVGli96c/CN7YvYauIdOASxb7zM9VnADquKsazzvQAyhM0+9bZ9Q06jYbDQs2sqecSrgXRZERhJxejBneUhn7lfUe7XeRn+Rvw4r/69pPHM/pbAliAWhw69Eee0GQm7+SImii94cO7Tp4rEGnfsCyQrjBlXI1Qw9q64K0XbC6/s1REczwbPnlDCTlWHS5btxei/k83b2lvUTNRRs7n82E1PoDBsQvSvZk8D389SAqlHyXsaG8uM45eh0h4BNOgw7vH1wqHrsyOG2TcPYOAKiTJWr07D8pQUOI3RHNDZVwbdeATRGF4dgDpB+d7YsNCc0rk3CXtKbhyErw220vCFbkvjb6L1wDWnf8Rj2sTF8NZzgnfPEnoR5faemoIuOeDmuIdCs2trGPjoQOu6Qt7S4WuPaFpLbWIUk92AaidG7Ma8Ez1YDFdOulK/VFTmdNtgNgb9uhZiWL3SzcTXmNXnbJLCWgcjpFPuNhNdaP4TWhtDB0BWEDsgne1VIOgwYVfY6wqGW4rXThluSrYSCuyxCJ65wkD0wplal7UmQlu0c2baaQMiNkdmhubhDX53vnjuhAwDIHyMGK/29mgVokoKvP0GlaOOk7KkU45w34oqHaPjKBMMppWOWQicOMh0mDL9D0qX41oW+DaFzDnWGM7wBE4AeKyDThZ6OiEhS6cctLKcttdhbEDprErciNDF8lWTYKm9zpnZYTodeSXKQsfW9pGxMRpZC51oCEDogL9jYxyVqvadVgfe69Np2i70Nd1rX7o0Y34+Gr3RWVcYdtmpS/lZxPh/T/2cs5kPnsCV0gANwCB3QW8XcsnRv2SpOa9dl28uj49q0Ctda1TYyreL0wA2TXg9E3GGrmRzatUlurBJruWgcDF0VGAahA3qreGwxD5uCLsTdhE9n+CrusFWbir/Uv3SYFzqMXoJZ3YATvQwrgDy2wEChiSskdFZfFf3IB5CJ0OH8FMzqCuxp2AAA4BhJVuckXX1V9NVWoAeMz9HhzHuGcZx15YTMYfxkiaLbjxQHlun1IMMqTLUuch5MPcb3dyUUR3HKhegQV9CdWl7LYfOTkXl4aml2CMgcj3l5EzonNCshAJL6jhQnt9LFjdf64VNWiZb39yoKk6y+iju3p6y9OTW6eHZdJOYL5f/GhY7P+06GbBHZ2IXEDXM3jIiDOUFawqamKsJee2mAHbETZ1VeneLt91T0s610hM2ujnxQ/LrQwj3/V4TnRPgA8nGmyAMGz5ZI6KCyAmshW6x7VGVZhTmcYCqm0NkTQ+jEHbaaLnhDS4qa/WT2WI3cYHwyMmeLcuDqKPJw5vzTBcrXXKljRw7PaWZkALoJnEkl/BsQOU4Rd05MnKXicYetZgpq45oIs7R8sni9rA1CC0JnKbSQh7OFE5/llMtJ4ejVAaYYVQKnDlM4S5KDPk1+LypzmgWzqywLDymRUyu7k1nYMDCUYRb5N1udw4NgVoS8tvKSgl4dEBXysgXbgCmcJ67A6OU4hyTDVkViQAn8YbiXNaGzxAuc6BmYNzO+J8KZnL47hA4wUcjDF/LBfEyh0cvwVdxhq4MFsqcUN7OE3u1LsDAZeVk7MUZfIU6fs/Tero/JZPp+jOhx36/k1Sd1lpjfgCxdaqLuepOFfJsuns/UbVj1ebr8yIdxCK1YzMTsfZDfnVjn73HStyh750ifmzTs/5Hft9Yor1fmC+dGdMwvLw/e6SR6NPDCzyEPp88i+V/O8eu3NK6tOVjwJD2nZwyeHJtDpD/ZeE71MBzV8EVskxCPphKHvVbQa62+qses6JsFEvkmenI6fb8wmyfabPY/Q4z+nTjdhnycHoyx7wib53ZH5GNHDre3Dw7NJ8yw0Z4orlQ0UuQ0IHRS4YCm0G0qm7dhykyYpt4njUfDV+1V8lwcirJJYByh2E2YS+F4sKgi3fgcncAL3wmiwv075N904WH4qM8XKQo5LvSSUnMoHkknA7bgybFbs6MJr5Wt1q0i7IXIyZS482T2r+IHwzHzWRHSvEbJVxZOK/8fowL3RBoXOuc9vzM8Kn71JvJwavzwvF/5qggUhZyisw/TLkfioLOFOirceNQTtmabImyDvZ1gLmY6DBtoWBSlN2dPwutGRNhNJRhq9Szf/1XO6a+Rh1Pji9LmBYiHTo+OKzt/6iztPAFXtl7Qy4p1L0znFM0Y3612aUjEbeQUYVl5PyXrzZmgeMdpQOh0sslbuCT09YWfF7++gDxsnfOcB5/fEFygzpBHjh05HHfJ6cqM78L+Efs1rm3BnbUqvF7YDdM5R9welj0a+V6KqiL0ZCQp62S8SzUH0EvhGS8ywlwd2zBiclnhSwWKks6W7KMZv3uNkg9bzVOBVjukZOu4RCdnA7doxxT5wxoVflGOfLg1wTVFEXnZCZ3FsO+ywD3/AfGnBeRjaywwnx70KxVaGfLKsSOHdTKjbOXXM3x9HaE1DXeORZK9k3AWn7tMxcznUYMizrBVu0D5LEmDaqZsTuWl9JxTIjyMPGwLLlcsnC5gxHTGkKXYyGKuzjDprfyagT/HIomtbfeYVZEsWkI/TgNnD8UftipSYyKJ0GlZfB8nd2Q2LnQqb53vHs4vNsSfv498bJwzCxV+/3kWULdQotZdt8om7SEsmcnHNa7XmZsE3AFCJ708IAVO3PlwUwWyl2vCwskdwb0Un/UG4/wzyMdmYYzdIz5eL2Lc5OaBpLdzqdxErp7iK09qVnIQOfkHBynqE6dXU+a3RozvzxHmwNlkl4svZXwSx4Nf2rzWn7888gfzv8NwbLwh+DeE1Hm84JEcI70l4+MpFW6TBio57Iac/1bwfphXm2iyeNXCvadg3lV3lTaRr+ouRthL+XmcsfAuVoy9XrLmbMjZ7wUhJ3/BWzXkHdWrM6GZ+WYtt7QnDWTwFmElUFrssHRf3flZ4FKxY4MmTGvNR7OaF+mc0JG8wDmXlQKHvyUXjNwrz5b1QuzonkEUnWptes5OdF8TrRj05qSHDdEbnRwNzHDQwj3jTnQuKnss3FOWgQdcjXBWTf6vEXNqFRbvMTgBIy43YSzb6hwTu9g2RDhuqEUzrO5lotKUrcwWyt9EJBmSrBoWvVLkmDg5Okuqjr1Pm8wPNxexzExSbtTIbK9O3XWRb3yOzr59a/99ga4l8pd+/Ezf4vwviM+fRVkdi2+/EVzzJxSUK9LHjhxubR8calDy08BXVkqygJiK2cqLlrHuMVhQyGePwK0Tk/S4jIaq+HQrU+kHhxwTOa0E/lkle3M3kjJF5lbxzFMxh62Sppf02a2k38Mle3HGXTdSlpM4zi9UKh9nxE+irO6ZZ4OFvl+mkm6+qIawWoZuV1OtkLNK+IyrTFtbEeqq9T+rvjtpuDW0l9CdnnaLNkJn7la0lUDee3JWVn4uxcWkMCnqisajGv57XENIVpW/jOfBSFlvnftKSN4vCrHzlPj5epTZa3LG89nHggV6ueR22K0qF5P7NdQom0mkTcKSchMt2rmE/hDNsZJpMNJj61hes1+J4v413qmasfhL4s8DqvKLejnXq0RtH1cS7aljYnj4YEH9f5qSDxtVVXo3lH3me7xmlNael5i1/zsndCTPcZ/fzgL2zwVqGZnmdeL0cSrm7sexkAd+bh8c2qlskWd/wenZ5jhIenMEhlWYUxXH0Q7BMKD8TH7u6LHSHVECKitOaFxbpd4nlUr77LQclykDQqdNxd07JxqSq2vco6FC5PtzHSI2EsyR7w/0YOsxcmzOjnGh0xfE7IVnIoTsP8XHIY6CvxuvMcY/wTk7DlNcJnYmydGdOHsQOTuRkkZbtaMGWpEDBvwpqjCytsd8QRqOJuLSLLj/j5GZlZ/DBkTlCDk4FO/KRisNiJyuKvB/QrakqJ+CLS4TO5FYyFtLLXpvzMsx26odcSRtXdkmoEhDorpCpeibBLZJb68xkz7npN+5IHQaxFM/kygPPMcZ+zBhu/K1xM68Eg15abG1IHKsFrJZ+oFM070rRE/WrfyiMKWZ59ol8P+xjH2ucyi+BaEDkdML316oVH5efP43TNFzBeNkl2kHExA51tmbYWE/suLZWadzm/S3YnCFOQ2xUpYjH+YzLF+iMtjZsi1LoQORczmcGD101f/1S4d9BeaILSS2OdiaaKsCCHvlpMPODHxAFvLNLoW/C638ZkHSNemqqTKtaozEzpwDz3RqJCIroQORczmvEWd30PLS1Qswh5aoyKKy61YAyBb1VsKux1kU9o2UnrVtFTHhSkG/l4rRs5NEsDSpfD2o0RzA6ZSetW0VX3fK7lkIHYicy+DfIBZ+UPzw97CFEVodgiftFp0UWyNK4OD8quwYI7s9fBMqjedgi9TyVdy8PFNS35ciY7cKbYuNuG1r3L/UQgci51K+T2zpOIHbRXgB5rAieHarCmnEYkHfVq3HnepZE4S5OC61bk0J3vkOgbPenLCjjtpiq6qk5gzkrbTnv8zEzJNl34xzWqW3qblrcRpxTjUAGOdmz6q891PzEDnrs8AYPfQWLTSuoL5zJNOAiRD6QnpyuuqVfnp1yzmqBKEwWUi++JeHjLwKo4W3K/SWt6nnBz3ySLENuX1wKMllNVreACvaDK4WM7O3VUY+QeVZ1VEEorPKorRfb8+caNO0lhIurQLaJPL9HT189yjZ3w0Z2KO6wv+rPZR1cx2+bzzdjx05nErE09oZGSJnmQtCzjxWCb37Qz98BubIjNYqlVZ1jczfgtlyT7SLbHOF+BlYReCUJS/Av8uBFC4TdOmeO93KvHbRGm9pCB2IHKLznPhUX4Xfv7DovYj85myLoHAZHPQkflDJgzKLn8KXebaFTslFDvsXzsJH6bz/FdoQ/AB5CgAAACiO0CmryPkuI3rcC72/DTyO4SkAAACggEKnTCLnjAhPMWLf5Cw4TNzD6ikAAACgwEKnKCJHbtp3jpbH8N+QP3Oil4WgOcmJn2QUntxA/skLxM/CjQAAAAA3Mb68HAAAAAAAQgcAAAAAAEIHAAAAAABCBwAAAAAAQgcAAAAAEDoAAAAAABA6AAAAAAAQOgAAAAAAEDoAAAAAABA6AAAAAAAQOgAAAACA0AEAAAAAgNABAAAAAIDQAQAAAACA0AEAAAAAgNABAAAAAIDQAQAAAACEDqwAAAAAAAgdAAAAAAAIHQAAAAAAB/h/AQYAh9sjm5VnSGsAAAAASUVORK5CYII="
              alt=""
            />
          </div>
          <div className="chatvia-register-header">
            <div>Register</div>
            <div>Get your Chatvia account now.</div>
          </div>
          <div className="chatvia-register-form">
            <form onSubmit={handleSubmit}>
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">
                  Email
                </label>
                <p>Email</p>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      {" "}
                      <CiMail size={20} />{" "}
                    </div>
                  </div>
                  <input
                    type="text"
                    class=""
                    required
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    id="inlineFormInputGroup"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">
                  Username
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <MdOutlinePerson size={20} />
                    </div>
                  </div>
                  <input
                    type="text"
                    class=""
                    id="inlineFormInputGroup"
                    required
                    name="username"
                    value={data.username}
                    onChange={handleChange}
                    placeholder=" Enter Username"
                  />
                </div>
              </div>
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">
                  Password
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CiLock size={20} />
                    </div>
                  </div>
                  <input
                    type="password"
                    class=""
                    id="inlineFormInputGroup"
                    required
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                  
                </div>
                {/* <div className="input-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                </div> */}
              </div>
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">
                  Add Image
                </label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <CiLock size={20} />
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  
                </div>
               
              </div>

              <button type="submit" disabled={loading}>
                Register
              </button>

              <div className="register-terms">
                By registering you agree to the Chatvia{" "}
                <span>Terms of Use</span>{" "}
              </div>
            </form>
          </div>
          <p className="register-signin">
            Already have an account ?{" "}
            <Link to="/login">
              <span>Signin</span>
            </Link>
          </p>
          <p className="register-signin">
            © 2024 Chatvia. Crafted with ❤️ by Themesbrand
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
