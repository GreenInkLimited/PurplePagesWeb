export function hideEmail(email) {
  const at_index = email.indexOf('@'); // find the index of the "@" symbol
  const local_part = email.slice(0, at_index); // extract the local part of the email
  let hidden_local_part;

  if (local_part.length <= 3) {
    // if the local part is short, just hide the whole thing
    hidden_local_part = '*'.repeat(local_part.length);
  } else {
    // otherwise, hide all but the first and last three characters
    hidden_local_part = `${local_part[0]}${'*'.repeat(local_part.length - 3)}${local_part.slice(-3)}`;
  }

  const domain_part = email.slice(at_index); // extract the domain part of the email
  return <>{hidden_local_part}{domain_part}</>; // combine the hidden local part with the domain part and return the result
}

export function hidePhoneNumber(phoneNumber) {
  const len = phoneNumber.length;
  if (len < 11) {
    // If phone number is less than 11 digits return it as is
    return phoneNumber;
  }
  const visibleDigits = 3; // number of digits to leave visible at the beginning and end
  const hiddenDigits = len - visibleDigits * 2; // number of digits to hide
  const hiddenStr = '*'.repeat(hiddenDigits);
  const startStr = phoneNumber.slice(0, visibleDigits);
  const endStr = phoneNumber.slice(len - visibleDigits, len);
  return <>{startStr}{hiddenStr}{endStr}</>;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return formatter.format(date);
};