import React from "react";
import styled from "styled-components";
import Chart from "react-google-charts";

const Graficas = ({ atencion, claridad, reparacion, mujeres, hombres }) => {
  return (
    <Charts>
      <Chart
        width={"800px"}
        height={"500px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ["Variaciones", `Hombres (${hombres})`, `Mujeres (${mujeres})`],
          [
            "Presta poca atención",
            atencion.hombres.baja,
            atencion.mujeres.baja,
          ],
          ["Adecuada atención", atencion.hombres.media, atencion.mujeres.media],
          [
            "presta demasiada atención",
            atencion.hombres.demasiada,
            atencion.mujeres.demasiada,
          ],
        ]}
        options={{
          // Material design options
          chart: {
            title: "Atencion a los sentimientos",
            subtitle: "Hombres vs Mujeres",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
      <Chart
        width={"800px"}
        height={"500px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ["Variaciones",`Hombres (${hombres})`, `Mujeres (${mujeres})`],
          [
            "Deben mejorar su claridad emocional",
            claridad.hombres.baja,
            claridad.mujeres.baja,
          ],
          [
            "Adecuada claridad emocional",
            claridad.hombres.media,
            claridad.mujeres.media,
          ],
          [
            "Excelente claridad emocional",
            claridad.hombres.demasiada,
            claridad.mujeres.demasiada,
          ],
        ]}
        options={{
          // Material design options
          chart: {
            title: "Claridad emocional",
            subtitle: "Hombres vs Mujeres",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
      <Chart
        width={"800px"}
        height={"500px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ["Variaciones",`Hombres (${hombres})`, `Mujeres (${mujeres})`],
          [
            "Deben mejorar su claridad emocional",
            reparacion.hombres.baja,
            reparacion.mujeres.baja,
          ],
          [
            "Adecuada claridad emocional",
            reparacion.hombres.media,
            reparacion.mujeres.media,
          ],
          [
            "Excelente claridad emocional",
            reparacion.hombres.demasiada,
            reparacion.mujeres.demasiada,
          ],
        ]}
        options={{
          // Material design options
          chart: {
            title: "Reparación de las emociones",
            subtitle: "Hombres vs Mujeres",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
    </Charts>
  );
};

const Charts = styled.div`
  width: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & div {
    margin: 30px 0;
  }
`;

export default Graficas;
