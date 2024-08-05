export default function SubmitButton({ nameProp }) {
  return (
    <>
      <button type="submit" className="w-full btn btn-accent mt-10">
        {nameProp}
      </button>
    </>
  );
}
