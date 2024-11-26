 const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));
    form.reset();
  }