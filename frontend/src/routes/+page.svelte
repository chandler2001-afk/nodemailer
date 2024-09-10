<script>
  let to = "";
  let subject = "";
  let note = "";

  const autoResize = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Import Zod for validation
  import { z } from "zod";

  // Define the email schema
  const emailSchema = z
    .string()
    .email({ message: "Kindly enter a valid email address" });

  // Validating the email using Zod
  const validate = () => {
    try {
      emailSchema.parse(to);
      return true;
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((err) => {
          alert(err.message);
        });
      }
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:3000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to, subject }), // Send the message as text
        });

        if (response.ok) {
          console.log("Email submitted successfully");
        } else {
          console.error("Error submitting email");
        }
      } catch (error) {
        console.error("Request failed", error);
      }
    }
  };
</script>

<main>
  <form action="/" method="post" on:submit={handleSubmit}>
    <input type="text" bind:value={to} placeholder="Enter recipient's email" />
    <input
      type="text"
      bind:value={subject}
      placeholder="Enter the mail subject"
    />
    <button type="submit"> Send! </button>
  </form>
</main>
