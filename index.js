// import { program } from "commander";
const {program} = require("commander")
const contacts = require("./db/contacts")

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);

    case "get":
      const oneContact = await contacts.getContactById(id)
      return console.log(oneContact);

    case "add":
        const newContact = await contacts.addContact({name, email, phone})
        return console.log(newContact);

    case "remove":
        const removeContact = await contacts.removeContact(id)
        return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction({action: "list"});
// invokeAction({action: "remove", id: "qdggE76Jtbfd9eWJHrssH"});
// invokeAction({action: "add", name: "Alona", email: "jfjf@com", phone: "8545874"});
// const arr = hideBin(process.argv)
// const {argv} = yargs(arr)
// // console.log(argv)
// invokeAction(argv)
invokeAction(options)