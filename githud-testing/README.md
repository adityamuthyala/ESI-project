const Register = () => {
const { register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit= (data, e) => {
      // const formData = new formData();
      // formData.append("file", data.file[0])

      // const res = await fetch("http://localhost:8080/api/v1/members", {
      //       method: "POST",
      //       body: formData,
      //   }).then((res) => res.json());
      //   alert(JSON.stringify(`${res.message}, status: ${res.status}`));

    const reqBody = data;
  axios.post(`http://localhost:8080/api/v1/members`, reqBody).then((response) => {
      console.log(response.data);
      e.target.reset();
      
  })

  }
  const submitFile = () => {
    axios.post(`http://localhost:8080/api/v1/uploads`, reqBody).then((response) => {
      console.log(response.data);
      e.target.reset();
      
  })
  }
