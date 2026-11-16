export default function StepIndicator() {
  return (
    <section className="stepper">
      <div className="stepper__item stepper__item--done">
        <span className="stepper__circle">1</span>
        <span className="stepper__line stepper__line--done"></span>
      </div>
      <div className="stepper__item stepper__item--done">
        <span className="stepper__circle">2</span>
        <span className="stepper__line stepper__line--done"></span>
      </div>
      <div className="stepper__item stepper__item--active">
        <span className="stepper__circle">3</span>
        <span className="stepper__line stepper__line--active"></span>
      </div>
      <div className="stepper__item">
        <span className="stepper__circle">4</span>
        <span className="stepper__line"></span>
      </div>
      <div className="stepper__item stepper__item--last">
        <span className="stepper__circle">5</span>
      </div>
    </section>
  );
}
