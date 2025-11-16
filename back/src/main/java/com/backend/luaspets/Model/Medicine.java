package com.backend.luaspets.Model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("MEDICINE") // Usa mayúsculas para coincidir con la DB
@Getter
@Setter
@NoArgsConstructor
@Builder
public class Medicine extends Product {

}
