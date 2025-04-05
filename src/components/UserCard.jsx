const UserCard = ({ user }) => {
    const {firstName, lastName , age, gender ,about,photoUrl ,} = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl mx-10">
      <figure>
        <img
          src={photoUrl}
          alt="Photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName }</h2>
        <p>{age}</p>
        <p>{gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
